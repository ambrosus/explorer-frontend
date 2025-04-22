// @ts-nocheck
import { latencyFilter } from '../../lib/helpers/table';
import useGetApolloInfo from '../../lib/hooks/use-get-apollo-info';
import useGetNodes from '../../lib/hooks/use-get-nodes';
import { INode } from '../../types';
import DataContext from './context';
import _ from 'lodash';
import { useState, useRef, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

const MAX_BINS = 40;
const baseApiUrl = process.env.REACT_APP_WSS_PUBLIC_API_ENDPOINT;
const socketUrl = `${baseApiUrl}/client`;

const DataProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const didUnmount = useRef(false);

  const [incomeNodes, setIncomeNodes] = useState<INode[]>([]);
  const { apolloInfo } = useGetApolloInfo();
  const { nodes } = useGetNodes(incomeNodes);
  const [bestBlock, setBestBlock] = useState(0);
  const [bestStats, setBestStats] = useState({
    gasPrice: '0',
    block: {
      arrived: 0,
      gasLimit: 0,
    },
  });
  const [lastBlock, setLastBlock] = useState(0);
  const [latency, setLatency] = useState(0);
  const [avgBlockTime, setAvgBlockTime] = useState(0);
  let blockPropagationChart: any;
  let uncleCount: any;
  let uncleCountChart: any;
  let avgHashrate: any;
  let lastGasLimit: any;
  let lastBlocksTime: any;
  let difficultyChart: any;
  let transactionDensity: any;
  let gasSpending: any;
  let pinned = [];
  let miners: any = [];

  const { sendMessage } = useWebSocket(socketUrl, {
    onOpen: () => {
      sendMessage(JSON.stringify({ emit: ['ready'] }));
    },
    onMessage: (e) => {
      const incomeData = JSON.parse(e.data);

      if (typeof incomeData === 'string') {
        sendMessage(`primus::pong::${new Date().getTime()}`);
      }

      if (incomeData.emit && incomeData.emit[0] === 'init') {
        const incomeNodes = incomeData.emit[1].nodes;
        setIncomeNodes(incomeNodes);
        socketAction('init', incomeNodes);
      } else if (incomeData.emit && incomeData.emit[0] === 'client-latency') {
        socketAction('client-latency', incomeData.emit[1]);
      } else {
        socketAction(incomeData.action, incomeData.data);
      }
    },
    shouldReconnect: (closeEvent) => {
      return didUnmount.current === false;
    },
    reconnectAttempts: 10,
    reconnectInterval: 5000,
  });

  const socketAction = (action: string, data: any) => {
    let index;
    switch (action) {
      case 'init':
        data.forEach((node: any) => {
          // Init hash rate
          if (_.isUndefined(node.stats.hashrate)) node.stats.hashrate = 0;

          // Init latency
          latencyFilter(node);

          // Init history
          if (_.isUndefined(data.history)) {
            data.history = new Array(40);
            _.fill(data.history, -1);
          }

          pinned = localStorage.pinned && JSON.parse(localStorage.pinned);

          // Init or recover pin
          node.pinned = new RegExp(node.id).test(pinned);
        });
        break;
      case 'block':
        index = findIndex({ id: data.id });
        if (index >= 0 && !_.isUndefined(incomeNodes[index].stats)) {
          if (incomeNodes[index].stats.block.number < data.block.number) {
            const bestNode = _.maxBy(incomeNodes, (node) => {
              return parseInt(node.stats.block.number);
            });

            if (bestNode) {
              const bestBlock = bestNode.stats.block;

              if (data.block.number > bestBlock.number) {
                data.block.arrived = _.now();
              } else {
                data.block.arrived = bestBlock.arrived;
              }

              incomeNodes[index].history = data.history;
            }
          }

          incomeNodes[index].stats.block = data.block;
          incomeNodes[index].stats.propagationAvg = data.propagationAvg;
        }
        updateBestBlock();
        break;
      case 'add':
        index = findIndex({ id: data.id });

        break;
      case 'update':
        index = findIndex({ id: data.id });

        if (
          index >= 0 &&
          !_.isUndefined(incomeNodes[index]) &&
          !_.isUndefined(incomeNodes[index].stats)
        ) {
          if (!_.isUndefined(incomeNodes[index].stats.latency))
            data.stats.latency = incomeNodes[index].stats.latency;

          if (_.isUndefined(data.stats.hashrate)) data.stats.hashrate = 0;

          if (incomeNodes[index].stats.block.number < data.stats.block.number) {
            const bestNode = _.maxBy(incomeNodes, (node) => {
              return parseInt(node.stats.block.number);
            });

            if (bestNode) {
              const bestBlock = bestNode.stats.block;

              if (data.block.number > bestBlock.number) {
                data.block.arrived = _.now();
              } else {
                data.block.arrived = bestBlock.arrived;
              }

              incomeNodes[index].history = data.history;
            }
          }

          incomeNodes[index].stats = data.stats;

          if (
            !_.isUndefined(data.stats.latency) &&
            _.get(incomeNodes[index], 'stats.latency', 0) !== data.stats.latency
          ) {
            incomeNodes[index].stats.latency = data.stats.latency;
            incomeNodes[index] = latencyFilter(incomeNodes[index]);
          }

          updateBestBlock();
        }
        break;
      case 'pending':
        index = findIndex({ id: data.id });

        if (!_.isUndefined(data.id) && index >= 0) {
          const node = incomeNodes[index];

          if (
            !_.isUndefined(node) &&
            !_.isUndefined(node.stats.pending) &&
            !_.isUndefined(data.pending)
          )
            incomeNodes[index].stats.pending = data.pending;
        }
        break;
      case 'stats':
        index = findIndex({ id: data.id });

        if (!_.isUndefined(data.id) && index >= 0) {
          const node = incomeNodes[index];

          if (!_.isUndefined(node) && !_.isUndefined(node.stats)) {
            incomeNodes[index].stats.active = data.stats.active;
            incomeNodes[index].stats.mining = data.stats.mining;
            incomeNodes[index].stats.hashrate = data.stats.hashrate;
            incomeNodes[index].stats.peers = data.stats.peers;
            incomeNodes[index].stats.gasPrice = data.stats.gasPrice;
            incomeNodes[index].stats.uptime = data.stats.uptime;

            if (
              !_.isUndefined(data.stats.latency) &&
              _.get(incomeNodes[index], 'stats.latency', 0) !==
                data.stats.latency
            ) {
              incomeNodes[index].stats.latency = data.stats.latency;
              latencyFilter(incomeNodes[index]);
            }
            updateActiveNodes();
          }
        }
        break;
      case 'info':
        index = findIndex({ id: data.id });

        if (index >= 0) {
          incomeNodes[index].info = data.info;

          if (_.isUndefined(incomeNodes[index].pinned))
            incomeNodes[index].pinned = false;

          // Init latency
          latencyFilter(incomeNodes[index]);
          updateActiveNodes();
        }
        break;
      case 'blockPropagationChart':
        blockPropagationChart = data.histogram;
        break;
      case 'uncleCount':
        uncleCount = uncleCount.data[0] + uncleCount.data[1];
        data.reverse();
        uncleCountChart = uncleCount.data;
        break;
      case 'charts':
        if (!_.isEqual(avgBlockTime, data.avgBlocktime))
          setAvgBlockTime(data.avgBlocktime / 24 / 60 / 60);

        if (!_.isEqual(avgHashrate, data.avgHashrate))
          avgHashrate = data.avgHashrate;

        if (
          !_.isEqual(lastGasLimit, data.gasLimit) &&
          data.gasLimit.length >= MAX_BINS
        )
          lastGasLimit = data.gasLimit;

        if (
          !_.isEqual(lastBlocksTime, data.blocktime) &&
          data.blocktime.length >= MAX_BINS
        )
          lastBlocksTime = data.blocktime;

        if (
          !_.isEqual(difficultyChart, data.difficulty) &&
          data.difficulty.length >= MAX_BINS
        )
          difficultyChart = data.difficulty;

        if (!_.isEqual(blockPropagationChart, data.propagation.histogram)) {
          blockPropagationChart = data.propagation.histogram;
        }

        data.uncleCount.reverse();

        if (
          !_.isEqual(uncleCountChart, data.uncleCount) &&
          data.uncleCount.length >= MAX_BINS
        ) {
          uncleCount =
            data.uncleCount[data.uncleCount.length - 2] +
            data.uncleCount[data.uncleCount.length - 1];
          uncleCountChart = data.uncleCount;
        }

        if (
          !_.isEqual(transactionDensity, data.transactions) &&
          data.transactions.length >= MAX_BINS
        )
          transactionDensity = data.transactions;

        if (
          !_.isEqual(gasSpending, data.gasSpending) &&
          data.gasSpending.length >= MAX_BINS
        )
          gasSpending = data.gasSpending;

        if (!_.isEqual(miners, data.miners)) {
          miners = data.miners;
        }
        break;
      case 'inactive':
        index = findIndex({ id: data.id });
        if (index >= 0) {
          if (!_.isUndefined(data.stats)) incomeNodes[index].stats = data.stats;
          updateActiveNodes();
        }
        break;
      case 'latency':
        if (!_.isUndefined(data.id) && !_.isUndefined(data.latency)) {
          const index = findIndex({ id: data.id });

          if (index >= 0) {
            const node = incomeNodes[index];
            if (
              !_.isUndefined(node) &&
              !_.isUndefined(node.stats) &&
              !_.isUndefined(node.stats.latency) &&
              node.stats.latency !== data.latency
            ) {
              node.stats.latency = data.latency;
              latencyFilter(node);
            }
          }
        }
        break;
      case 'client-ping':
        sendMessage(
          JSON.stringify({
            emit: [
              'client-pong',
              {
                serverTime: data.serverTime,
                clientTime: new Date().getTime(),
              },
            ],
          }),
        );
        break;
      case 'client-latency':
        setLatency(data.latency);
        break;
      default:
        console.info('lost action:', action);
    }
  };

  const findIndex = (search: any) => _.findIndex(incomeNodes, search);

  useEffect(() => {
    return () => {
      didUnmount.current = true;
    };
  }, []);

  const updateActiveNodes = () => {
    updateBestBlock();
  };

  const updateBestBlock = () => {
    if (incomeNodes.length) {
      const currentBestBlock = incomeNodes.find((el) => {
        return (
          el.info.name.includes('apollo') &&
          el.info.node.includes('OpenEthereum')
        );
      })?.stats?.block?.number;

      if (currentBestBlock && currentBestBlock !== bestBlock) {
        setBestBlock(currentBestBlock);
        const data = _.max(incomeNodes, (node) => {
          return parseInt(node.stats.block.number);
        })?.stats;
        setBestStats(data);

        bestStats && setLastBlock(bestStats?.block.arrived);
      }
    }
  };

  const addNewNode = (data: any) => {
    const index = findIndex({ id: data.id });

    if (_.isUndefined(data.history)) {
      data.history = new Array(40);
      _.fill(data.history, -1);
    }

    if (index < 0) {
      if (!_.isUndefined(data.stats) && _.isUndefined(data.stats.hashrate)) {
        data.stats.hashrate = 0;
      }

      data.pinned = false;

      incomeNodes.push(data);

      return true;
    }

    data.pinned = !_.isUndefined(incomeNodes[index].pinned)
      ? incomeNodes[index].pinned
      : false;

    if (!_.isUndefined(incomeNodes[index].history)) {
      data.history = incomeNodes[index].history;
    }

    incomeNodes[index] = data;
    updateActiveNodes();
    return false;
  };

  const value = {
    nodes,
    bestBlock,
    lastBlock,
    avgBlockTime,
    apolloInfo,
    bestStats,
    latency,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
