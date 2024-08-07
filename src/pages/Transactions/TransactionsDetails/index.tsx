import EventDetails from '../../../components/EventDetails';
import { getContractDataWithProxy } from '../../../services/contract.service';
import API2 from 'API/newApi';
import ContentCopy from 'assets/icons/CopyIcons/ContentCopy';
import ContentCopyed from 'assets/icons/CopyIcons/ContentCopyed';
import CopyPopUp from 'assets/icons/CopyIcons/CopyPopUp';
import Eye from 'assets/icons/Eye';
import { Content } from 'components/Content';
import HeadInfo from 'components/HeadInfo';
import { ethers } from 'ethers';
import useCopyContent from 'hooks/useCopyContent';
import useDeviceSize from 'hooks/useDeviceSize';
import { useTypedSelector } from 'hooks/useTypedSelector';
import moment from 'moment';
import AddressBlock from 'pages/Addresses/AddressDetails/components/AddressBlocks';
import AddressBlocksHeader from 'pages/Addresses/AddressDetails/components/AddressBlocksHeader';
import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { NavLink, useParams } from 'react-router-dom';
import {
  displayAmount,
  numberWithCommas,
  sliceData10,
  sliceData5,
} from 'utils/helpers';

export const TransactionDetails = () => {
  const { hash } = useParams();

  const { isCopy, copyContent, isCopyPopup } = useCopyContent(hash);
  const { FOR_TABLET } = useDeviceSize();
  const ref = useRef(null);
  const { data: appData } = useTypedSelector((state: any) => state.app);
  const [isInputExpanded, setIsInputExpanded] = useState<string | boolean>(
    'null',
  );
  const [txData, setTxData] = useState({
    value: {
      ether: '',
    },
    from: '',
    to: '',
    gasCost: {
      ether: '',
    },
    timestamp: '',
    nonce: '',
    transactionIndex: '',
    input: '',
    blockHash: '',
    inners: [],
    determinedType: '',
    blockNumber: 0,
    status: '',
    type: '',
    token: {
      symbol: '',
    },
  });

  useEffect(() => {
    API2.getTransaction(hash).then((res) => setTxData(res.data[0]));
  }, [hash]);

  useEffect(() => {
    if (checkOverflow(ref.current)) {
      setIsInputExpanded(false);
    } else {
      setIsInputExpanded('null');
    }
  }, [txData, hash]);

  const checkOverflow = (el: any) => {
    const curOverflow = el.style.overflow;

    if (!curOverflow || curOverflow === 'visible') el.style.overflow = 'hidden';

    const isOverflowing =
      el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;

    el.style.overflow = curOverflow;

    return isOverflowing;
  };

  const showInputData = () => setIsInputExpanded((state) => !state);

  const confirmations =
    appData?.netInfo?.lastBlock?.number - txData?.blockNumber;

  const itemFirst: any = [
    {
      name: 'AMOUNT',
      value: `${displayAmount(txData.value.ether)} ${
        txData.token ? txData.token.symbol : 'AMB'
      }`,
    },
    {
      name: 'FROM',
      value: txData?.from ? (
        <NavLink
          rel="nofollow"
          style={{ fontSize: '14px', fontWeight: 600 }}
          to={`/address/${txData?.from}/`}
          className="universall_light1"
        >
          {sliceData10(txData.from as string, 7)}
        </NavLink>
      ) : (
        'No address'
      ),
    },
    {
      name: 'TO',
      value: txData?.to ? (
        <NavLink
          rel="nofollow"
          style={{ fontSize: '14px', fontWeight: 600 }}
          to={`/address/${txData?.to}/`}
          className="universall_light1"
        >
          {sliceData10(txData.to as string, 7)}
        </NavLink>
      ) : (
        'No address'
      ),
    },
    {
      name: 'TX FEE',
      value: `${txData.gasCost.ether} AMB`,
    },
  ];

  const itemThird: any = [
    {
      name: 'BLOCK HASH',
      value: (
        <NavLink
          rel="nofollow"
          to={`/block/${txData.blockHash}/`}
          className="atlas_details_balance_fonts_bold head_info_cells_secondary_block"
        >
          {txData.blockHash}
        </NavLink>
      ),
    },
    {
      name: 'HEIGHT / CONFIRMATIONS',
      value: `${numberWithCommas(txData.blockNumber || 0)} (
        ${numberWithCommas(confirmations > 0 ? confirmations : 0)})`,
    },
  ];

  return (
    <Content>
      <Helmet>
        <link rel="canonical" href="https://airdao.io/explorer/tx/" />
        <meta name="robots" content="noindex" />
        <title>Transactions | AirDAO Network Explorer</title>
        <meta
          name="description"
          content="Explore AirDAO Network Transactions: transfers, contacts, fees, validador proxy, block rewards, KYCs, challenges, payouts, roles, heads"
        />
      </Helmet>
      <section className="address_details transaction_details container">
        <Content.Header>
          <div className="address_details_h1 address_details_h1-tx">
            <div>
              <h1>{txData.type}</h1>
              <span
                className={`address_details_h1_status ${
                  txData.status === 'FAIL'
                    ? 'address_details_h1_status_error'
                    : ''
                }`}
              >
                {txData.status}
              </span>
            </div>
            <div className="address_details_copy" style={{ fontSize: '18px' }}>
              <span className="transaction_details_hash">Hash</span>
              <span style={{ fontSize: '18px', fontWeight: '400' }}>
                {sliceData5(hash)}
              </span>
              <button
                className={'address_details_copy_btn'}
                onClick={copyContent}
              >
                {isCopy ? (
                  <>
                    <ContentCopyed />
                  </>
                ) : (
                  <ContentCopy />
                )}
                {FOR_TABLET && isCopyPopup && isCopy && (
                  <div className="address_details_copyed">
                    <CopyPopUp x={3} y={20} values="Copied" />
                  </div>
                )}
              </button>
            </div>
          </div>

          <HeadInfo data={itemFirst} className="head_info" />

          <div className="apollo_details_balance apollo_details_balance-tx2">
            <div className="apollo_details_balance_cells">
              <p className="apollo_details_balance_fonts_normal universall_light1">
                DATE
              </p>
              <p className="atlas_details_balance_fonts_bold">
                {moment
                  .unix(Number(txData.timestamp))
                  .format('ddd, D MMM YYYY HH:mm:ss')}
              </p>
            </div>
            <div className="apollo_details_balance_cells">
              <p className="apollo_details_balance_fonts_normal universall_light1">
                NONCE (POSITION)
              </p>
              <p className="atlas_details_balance_fonts_bold">
                {numberWithCommas(txData.nonce)} (
                {+txData.transactionIndex < 0 ? '-' : txData.transactionIndex})
              </p>
            </div>
            <div
              className={`apollo_details_balance_cells ${
                isInputExpanded === true
                  ? 'apollo_details_balance_cells--expanded'
                  : ''
              }`}
            >
              <p className="apollo_details_balance_fonts_normal universall_light1">
                INPUT DATA
              </p>
              <p
                className="atlas_details_balance_fonts_bold"
                ref={ref}
                style={
                  isInputExpanded === true
                    ? { wordBreak: 'break-all' }
                    : { paddingRight: '20px' }
                }
              >
                {txData.input === '0x' ? '—' : txData.input}
              </p>
              {isInputExpanded !== 'null' && (
                <span
                  onClick={showInputData}
                  className="address_blocks_eye_icon"
                >
                  <Eye />
                </span>
              )}
            </div>
          </div>
          <HeadInfo data={itemThird} className="head_info" />
        </Content.Header>
      </section>

      <InnerTransactions inners={txData.inners} />

      <TransactionEvents hash={hash!} />
    </Content>
  );
};

function InnerTransactions({ inners }: { inners: any[] }) {
  if (!inners || inners.length === 0) return null;

  return (
    <section className="transactions_details_list">
      <div className="container" style={{ margin: '0 auto' }}>
        <p className="transactions_details_list_title">Transactions</p>
      </div>
      <div className="transactions_details_list_wrapper container">
        <AddressBlocksHeader
          txhash="txHash"
          method="Method"
          from="From"
          to="To"
          date="Date"
          block="Block"
          amount="Amount"
          txfee="txFee"
          token={null}
          methodFilters={null}
          isTableColumn={'address_blocks_cells no_border'}
        />
        {!!inners &&
          inners.map((tx: any, i) => (
            <AddressBlock
              isLatest={true}
              key={i}
              txhash={tx.hash}
              method={tx.type}
              from={tx.from}
              to={tx.to}
              date={moment(tx.timestamp * 1000).fromNow()}
              block={tx.blockNumber}
              amount={tx.value.ether}
              txfee={tx.gasCost.ether}
              token={`${tx?.token ? tx?.token : 'AMB'}`}
              symbol={`${tx?.symbol ? tx?.symbol : 'AMB'}`}
              isTableColumn="address_blocks_cells"
              isIcon={true}
              inners={tx.inners}
              status={tx.status}
            />
          ))}
      </div>
    </section>
  );
}

function TransactionEvents({ hash }: { hash: string }) {
  const readProvider = new ethers.providers.JsonRpcProvider(
    process.env.REACT_APP_EXPLORER_NETWORK,
  );

  const [events, setEvents] = useState<any[]>([]);
  const [ifaces, setIfaces] = useState<any>({});

  useEffect(() => {
    (async () => {
      const receipt = await readProvider.getTransactionReceipt(hash);
      if (!receipt) return;
      const events: ethers.Event[] = receipt.logs.map(
        (log: ethers.providers.Log) => {
          return {
            ...log,
            getTransaction: async () =>
              await readProvider.getTransaction(receipt.transactionHash),
            getBlock: async () =>
              await readProvider.getBlock(receipt.blockNumber),
            removeListener: () => {},
            getTransactionReceipt: async () => receipt,
          };
        },
      );
      setEvents(events);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const contractAddresses = new Set(
        events.map((event: any) => event.address),
      );
      const newIfaces: any = {};
      for (const address of contractAddresses) {
        const contractData = await getContractDataWithProxy(address);
        const fullAbi = [
          ...(contractData?.contractAbi ?? []),
          ...(contractData.implAbi ?? []),
        ];
        const iface = new ethers.utils.Interface(fullAbi);
        newIfaces[address] = iface;
      }
      setIfaces(newIfaces);
      console.log(newIfaces);
    })();
  }, [events]);

  if (!events.length) return null;

  return (
    <section
      className="transactions_details_list"
      style={{ marginTop: '50px' }}
    >
      <div className="container" style={{ margin: '0 auto' }}>
        <p className="transactions_details_list_title">Events</p>
      </div>
      <div className="transactions_details_list_wrapper container">
        {events.map((event: any, i) => (
          <EventDetails
            eventRaw={event}
            iface={ifaces[event.address]}
            key={i}
          />
        ))}
      </div>
    </section>
  );
}
