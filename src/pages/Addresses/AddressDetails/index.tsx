import API from '../../../API/api';
import NodeHeader from '../../../components/NodeHeader';
import { TokenType, TransactionProps } from './address-details.interface';
import { Content } from 'components/Content';
import CopyBtn from 'components/CopyBtn';
import FilteredToken from 'components/FilteredToken';
import OverallBalance from 'components/OveralBalance';
import Tabs from 'components/Tabs';
import Token from 'components/Token';
import { formatEther } from 'ethers/lib/utils';
import { useActions } from 'hooks/useActions';
import useDeviceSize from 'hooks/useDeviceSize';
import { useTypedSelector } from 'hooks/useTypedSelector';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { shallowEqual } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getDataForAddress } from 'services/address.service';
import { TParams } from 'types';

const AddressDetails = () => {
  const { filters } = useTypedSelector(
    (state) => state.tokenFilters,
    shallowEqual,
  );
  const {
    loading,
    data: addressData = {},
    error: errorData,
  } = useTypedSelector((state: any) => state.position);

  const { getContractAddressData } = useActions();
  useEffect(() => {
    getContractAddressData(address);
  }, []);

  const { data: sourcifyData } = useTypedSelector((state) => state?.sourcify);
  const { accountInfo, contractInfo } = sourcifyData || {};
  const { isContract } = accountInfo?.data || false;

  const { address, type, filtered, tokenToSorted }: TParams = useParams();
  const { setPosition, addFilter } = useActions();
  const [transactionType, setTransactionType] = useState(type || '');
  const [selectedToken, setSelectedToken] = useState<TokenType | null>(null);
  const [tx, setTx] = useState<TransactionProps[] | []>([]);
  const [pageNum, setPageNum] = useState(1);

  const [limitNum] = useState(50);
  const [showMore, setShowMore] = useState(false);
  const showMoreRef: any = useRef(null);
  const observer = useRef<IntersectionObserver>();
  const navigate = useNavigate();

  const showMoreRefHandler = () => {
    setShowMore(!showMore);
    if (showMoreRef.current) {
      showMoreRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const lastCardRef = (node: any) => {
    if (loading) return;
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver((entries) => {
      if (
        entries[0].isIntersecting &&
        addressData &&
        pageNum < addressData?.meta?.totalPages
      ) {
        if (type !== 'ERC-20_Tx') {
          setPageNum((prevNum) => prevNum + 1);
        }
      }
    });
    if (node) {
      observer.current.observe(node);
    }
  };

  useEffect(() => {
    if (address?.trim() === '0x0000000000000000000000000000000000000000') {
      navigate(`/notfound`);
    }
    if (tokenToSorted?.length && tokenToSorted !== 'transfers') {
      navigate(`/notfound`);
    }
    if (
      type?.length &&
      !(type === 'ERC-20_Tx' || type === 'transfers' || type === 'contract')
    ) {
      navigate(`/notfound`);
    }

    if (address) {
      API.searchItem(address)
        .then((data: any) => !data.meta.search && navigate(`/notfound`))
        .catch(() => navigate(`/notfound`));
    }
  }, []);

  useEffect(() => {
    if (address || type || filtered || tokenToSorted) {
      setPageNum(1);
      setPosition(null);
      setTx([]);
    }
    return () => {
      setPageNum(1);
      setPosition(null);
      setTx([]);
    };
  }, [address, type, filtered, tokenToSorted]);

  async function getAddressDetailsData() {
    if (filtered && !(filtered === 'code') && addressData?.tokens?.length) {
      addFilter(
        addressData.tokens.find(
          (token: TokenType) => token.contract === filtered,
        ),
      );
    }
    if (!loading || errorData) {
      if (addressData?.meta?.totalPages > pageNum) {
        //TODO double code
        await setPosition(getDataForAddress, address?.trim(), {
          filtered:
            addressData && addressData.filters ? addressData.filters : [],
          selectedTokenFilter: selectedToken?.contract
            ? selectedToken.contract
            : filtered,
          limit: limitNum,
          type: transactionType,
          page: pageNum,
        });
      } else {
        await setPosition(getDataForAddress, address?.trim(), {
          filtered:
            addressData && addressData.filters ? addressData.filters : [],
          selectedTokenFilter: selectedToken?.contract
            ? selectedToken.contract
            : filtered,
          limit: limitNum,
          type: transactionType,
          page: pageNum,
        });
      }
    }
  }

  useEffect(() => {
    getAddressDetailsData();
    //TODO refactor
  }, [
    filters,
    transactionType,
    selectedToken,
    filtered,
    tokenToSorted,
    address,
    pageNum,
    type,
  ]);

  function setTxDataHandler() {
    if (addressData?.transactions) {
      setTx((prevState) => {
        //TODO дважды метод
        const compareState = [...prevState, ...addressData.transactions];
        const addressDataState = addressData.transactions;
        //TODO полное дублирование
        if (type === 'ERC-20_Tx' && !filtered) {
          const newTx: any = addressDataState.sort(
            (a: any, b: any) => b.block - a.block,
          );
          return newTx;
        } else if (type === 'ERC-20_Tx' && filtered) {
          const newTx: any = addressDataState.sort(
            (a: any, b: any) => b.block - a.block,
          );
          return newTx;
        } else if (!type || type === 'transfers') {
          //TODO зачем клон
          const newTx: TransactionProps[] = compareState;
          const transfersDataTx: TransactionProps[] = newTx.filter(
            (item: TransactionProps) => item.method === 'Transfer',
          );
          return type === 'transfers' ? transfersDataTx : newTx;
        } else if (type === 'contract') {
          const newTx: any = [];
          return newTx;
        }
      });
    }
  }

  useLayoutEffect(() => {
    setTxDataHandler();
  }, [addressData, type]);

  useEffect(() => {
    if (addressData?.tokens && !selectedToken) {
      setSelectedToken(
        addressData.tokens.find(
          (token: TokenType) => token.contract === filtered,
        ),
      );
    }
    console.log(addressData);
  }, [addressData]);

  const { FOR_TABLET } = useDeviceSize();

  return (
    <Content>
      <section className="address_details">
        <Content.Header>
          <h1 className="address_details_h1">
            {isContract ? 'Smart Contract Details' : 'Address Details'}
            <div
              className="address_details_copy"
              style={{ fontSize: isContract ? 18 : '2.3rem' }}
            >
              {isContract && (
                <span> {FOR_TABLET ? <span>Address:&nbsp;</span> : null} </span>
              )}
              {address}
              &nbsp; &nbsp;
              <CopyBtn />
            </div>
          </h1>
          <div className="address_details_section">
            <div className="address_details_info">
              <OverallBalance
                addressBalance={
                  addressData?.balance &&
                  Number(formatEther(addressData.balance)).toFixed(2)
                }
              />

              <Token
                loading={loading}
                addressData={addressData}
                selectedToken={selectedToken}
                onClick={setSelectedToken}
              />
            </div>

            {selectedToken && (
              <FilteredToken setSelectedToken={setSelectedToken} />
            )}
          </div>
          <NodeHeader getNodeData={API.getAccount}>
            {({ node }: any) => {
              return (
                node?.isContract && (
                  <div className="wrapper-bytes" ref={showMoreRef}>
                    <p
                      className={`${!showMore ? 'gradient-text' : ''}`}
                      style={{ wordWrap: 'break-word' }}
                    >
                      {showMore
                        ? node.byteCode
                        : `${node.byteCode.substring(
                            0,
                            FOR_TABLET ? 900 : 320,
                          )}`}
                    </p>
                    <button
                      className="read-more-btn"
                      onClick={showMoreRefHandler}
                    >
                      {showMore ? 'Show less' : 'Show more'}
                    </button>
                  </div>
                )
              );
            }}
          </NodeHeader>
        </Content.Header>
        <Content.Body isLoading={filtered ? !loading : true}>
          <Tabs
            isContract={isContract}
            pageNum={pageNum}
            lastCardRef={lastCardRef}
            onClick={setSelectedToken}
            selectedToken={selectedToken}
            transactionType={transactionType}
            data={tx || []}
            loading={loading}
            setTransactionType={setTransactionType}
            isIcon={true}
            contractInfo={contractInfo}
          />
        </Content.Body>
      </section>
    </Content>
  );
};
export default React.memo(AddressDetails);
