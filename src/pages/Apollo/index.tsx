import API2 from '../../API/newApi';
import AtlasBlocksHeader from '../Atlas/components/AtlasBlocksHeader';
import TabsNew from '../Transactions/components/TabsNew';
import ApolloBlocksBody from './components/ApolloBlocksBody';
import {
  AmbErrorProvider,
  Contracts,
  ContractNames,
} from '@airdao/airdao-node-contracts';
// @ts-ignore
import { getCurrentAmbNetwork } from 'airdao-components-and-tools/utils';
import { Content } from 'components/Content';
import HeadInfo from 'components/HeadInfo';
import { utils } from 'ethers';
import { useTypedSelector } from 'hooks/useTypedSelector';
import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';

export const Apollo = memo(() => {
  const { data: appData } = useTypedSelector((state: any) => state.app);

  const {
    total = 0,
    online = 0,
    offline = 0,
    connecting = 0,
  } = appData?.netInfo?.apollos || 0;

  const { avgBlockTime = 0 } = appData?.netInfo || 0;

  const itemFirst: any = [
    {
      name: 'TOTAL NODES',
      value: total,
    },
    {
      name: 'ONLINE',
      value: online,
      style: {
        color: '#16C784',
      },
    },
    {
      name: 'OFFLINE',
      value: offline,
    },
    {
      name: 'CONNECTING',
      value: connecting,
    },
    {
      name: 'Avg block / prop. time',
      value: `${avgBlockTime.toFixed(3)} sec`,
    },
  ];

  useEffect(() => {
    getRetiredApollos();
  }, []);

  const timestampToFormattedDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000); // Умножаем на 1000, так как Unix-время измеряется в миллисекундах

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const year = date.getUTCFullYear();
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes} UTC`;
  };

  const getRetiredApollos = async () => {
    const network = getCurrentAmbNetwork();
    const provider = new AmbErrorProvider(network.rpcUrl, network.chainId);
    // @ts-ignore
    const contracts = new Contracts(provider, network.chainId);

    const lockKeeper = contracts.getContractByName(ContractNames.LockKeeper);
    const serverNodes = contracts.getContractByName(
      ContractNames.ServerNodesManager,
    );
    const arr = [];

    const locks = await lockKeeper.getAllLocks();
    for (const lock of locks) {
      if (lock.locker !== serverNodes.address) continue;
      if (!lock.description.startsWith('ServerNodes unstake: ')) continue;

      const address = lock.description.slice('ServerNodes unstake: '.length);
      const nodeInfo = await serverNodes.stakes(address);
      if (!nodeInfo.stake.isZero()) continue;

      arr.push({
        address: lock.description.replace('ServerNodes unstake: ', '0x'),
        isRetired: true,
        unlockTime: timestampToFormattedDate(
          +utils.formatUnits(lock.firstUnlockTime, 0),
        ),
        amount: utils.formatEther(lock.intervalAmount),
      });
    }
    return arr;
  };

  return (
    <Content>
      <Helmet>
        <link rel="canonical" href="https://airdao.io/explorer/apollo/" />
        <meta name="robots" content="noindex" />
        <title>Apollo Nodes | AirDAO Network Explorer</title>
        <meta
          name="description"
          content="Explore AirDAO Network Apollo Nodes: total nodes, online, offline, connecting, avg block / prop. time"
        />
      </Helmet>
      <Content.Header>
        <h1 className="main_info_apollo_heading">Apollo Nodes</h1>
        <HeadInfo data={itemFirst} className="head_info" />
      </Content.Header>
      <Content.Body>
        <TabsNew
          tableHeader={() => <AtlasBlocksHeader pageTitle="blocks" />}
          sortOptions={[
            { title: 'Address', value: 'address' },
            { title: 'Total blocks', value: 'totalBundles' },
            { title: 'Balance', value: 'balance' },
            { title: 'Stake', value: 'stake' },
            {
              title: 'Retired',
              value: 'retired',
              heading: <AtlasBlocksHeader pageTitle="blocks" isRetired />,
              listData: getRetiredApollos,
            },
          ]}
          fetchData={API2.getApollos}
          initSortTerm={'totalBundles'}
          fetchParams={{ sort: '', page: '' }}
          label="Nodes"
          render={(list: any) =>
            list.map((el: any, index: any) => (
              <ApolloBlocksBody key={index} index={index + 1} item={el} />
            ))
          }
        />
      </Content.Body>
    </Content>
  );
});
