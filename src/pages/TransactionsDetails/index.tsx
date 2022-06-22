import api from '../../API/api';
import ContentCopy from '../../assets/icons/CopyIcons/ContentCopy';
import ContentCopyed from '../../assets/icons/CopyIcons/ContentCopyed';
import CopyPopUp from '../../assets/icons/CopyIcons/CopyPopUp';
import { Content } from '../../components/Content';
import useCopyContent from '../../hooks/useCopyContent';
import useDeviceSize from '../../hooks/useDeviceSize';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { numberWithCommas, sliceData10 } from '../../utils/helpers';
import AddressBlock from '../Addresses/AddressDetails/components/AddressBlocks/AddressBlock';
import AddressBlocksHeader from '../Addresses/AddressDetails/components/AddressBlocksHeader';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

export const TransactionDetails = () => {
  const { hash } = useParams();
  const { isCopy, copyContent, isCopyPopup } = useCopyContent(hash);
  const { FOR_TABLET } = useDeviceSize();
  const navigate = useNavigate();
  const ref = useRef(null);
  const { data: appData } = useTypedSelector((state: any) => state.app);

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
  });

  useEffect(() => {
    api.getTransaction(hash).then((res: any) => {
      if (res.meta?.code === 200) {
        setTxData(res.data);
      }
    });
  }, []);

  const redirectToDetails = (txhash: string | number) => {
    navigate(`/transactions/${txhash}`);
  };

  const checkOverflow = (el: any) => {
    var curOverflow = el.style.overflow;

    if (!curOverflow || curOverflow === 'visible') el.style.overflow = 'hidden';

    var isOverflowing =
      el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;

    el.style.overflow = curOverflow;

    return isOverflowing;
  };
  return (
    <Content>
      <section className="address_details transaction-details container">
        <Content.Header>
          <div className="address_details_h1 address_details_h1-tx">
            <div>
              <h1>{txData.determinedType}</h1>
              <span className="address_details_h1_status">{txData.status}</span>
            </div>
            <div className="address_details_copy" style={{ fontSize: '18px' }}>
              <span className="transaction-details__hash">Hash</span>
              {sliceData10(hash as string)}
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
                    <CopyPopUp x={3} y={20} values="Copyed" />
                  </div>
                )}
              </button>
            </div>
          </div>
        </Content.Header>
        <div className="apollo_details_balance apollo_details_balance-tx1">
          <div className="apollo_details_balance_cells">
            <p className="apollo_details_balance_fonts_normal universall_light1">
              AMOUNT
            </p>
            <p className="atlas_details_balance_fonts_bold">
              {txData.value.ether} AMB
            </p>
          </div>
          {txData.from && (
            <div className="apollo_details_balance_cells">
              <p className="apollo_details_balance_fonts_normal universall_light1">
                FROM
              </p>
              <NavLink
                style={{ fontSize: '18px' }}
                to={`/addresses/${txData.from}`}
                className="universall_light1"
              >
                {sliceData10(txData.from as string, 7)}
              </NavLink>
            </div>
          )}
          <div className="apollo_details_balance_cells">
            <p className="apollo_details_balance_fonts_normal universall_light1">
              TO
            </p>
            <NavLink
              style={{ fontSize: '18px' }}
              to={`/addresses/${txData.to}`}
              className="universall_light1"
            >
              {sliceData10(txData.to as string, 7)}
            </NavLink>
          </div>
          <div className="apollo_details_balance_cells">
            <p className="apollo_details_balance_fonts_normal universall_light1">
              TX FEE
            </p>
            <p className="atlas_details_balance_fonts_bold">
              {txData.gasCost.ether} AMB
            </p>
          </div>
        </div>
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
              {numberWithCommas(txData.nonce, +txData.nonce)} (
              {txData.transactionIndex})
            </p>
          </div>
          <div className="apollo_details_balance_cells">
            <p className="apollo_details_balance_fonts_normal universall_light1">
              INPUT DATA
            </p>
            <p className="atlas_details_balance_fonts_bold" ref={ref}>
              {txData.input}
            </p>
          </div>
        </div>
        <div className="apollo_details_balance apollo_details_balance-tx3">
          <div className="apollo_details_balance_cells">
            <p className="apollo_details_balance_fonts_normal universall_light1">
              BLOCK HASH
            </p>
            <p className="atlas_details_balance_fonts_bold">
              {txData.blockHash}
            </p>
          </div>
          <div className="apollo_details_balance_cells">
            <p className="apollo_details_balance_fonts_normal universall_light1">
              HEIGHT / CONFIRMATIONS
            </p>
            <p className="atlas_details_balance_fonts_bold">
              {numberWithCommas(txData.blockNumber, txData.blockNumber)} (
              {appData?.netInfo?.lastBlock?.number - txData.blockNumber})
            </p>
          </div>
        </div>
      </section>
      {txData.inners && !!txData.inners.length && (
        <section className="transactions-details-list">
          <div className="container" style={{ margin: '0 auto' }}>
            <p className="transactions-details-list__title">Transactions</p>
          </div>
          <div className="container" style={{ margin: '0 auto' }}>
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
              isTableColumn={'address_blocks_cells'}
            />
          </div>
          <div className="transactions-details-list__wrapper container">
            {!!txData.inners &&
              txData.inners.map((tx: any, i) => (
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
                  hashOnClick={redirectToDetails}
                />
              ))}
          </div>
        </section>
      )}
    </Content>
  );
};
