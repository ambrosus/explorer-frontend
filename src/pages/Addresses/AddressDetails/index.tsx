import { TokenType, TransactionProps } from './address-details.interface';
import useLastCardRef from './useLastCardRef';
import ContentCopy from 'assets/icons/CopyIcons/ContentCopy';
import ContentCopyed from 'assets/icons/CopyIcons/ContentCopyed';
import CopyPopUp from 'assets/icons/CopyIcons/CopyPopUp';
import { Content } from 'components/Content';
import FilteredToken from 'components/FilteredToken';
import OverallBalance from 'components/OveralBalance';
import Tabs from 'components/Tabs';
import Token from 'components/Token';
import { formatEther } from 'ethers/lib/utils';
import { useActions } from 'hooks/useActions';
import useCopyContent from 'hooks/useCopyContent';
import useHover from 'hooks/useHover';
import { useTypedSelector } from 'hooks/useTypedSelector';
import useWindowSize from 'hooks/useWindowSize';
import React, { useEffect, useState } from 'react';
import { shallowEqual } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDataForAddress } from 'services/address.service';
import { TParams } from 'types';
import { toUniqueValueByBlock } from 'utils/helpers';

export const AddressDetails = () => {
  const { filters } = useTypedSelector(
    (state) => state.tokenFilters,
    shallowEqual,
  );
  const {
    loading,
    data: addressData,
    error: errorData,
  } = useTypedSelector((state: any) => state.position);
  const { address, type, filtered, tokenToSorted }: TParams = useParams();
  const { setPosition, addFilter } = useActions();
  const [transactionType, setTransactionType] = useState(type);
  const [selectedToken, setSelectedToken] = useState<TokenType | null>(null);
  const [tx, setTx] = useState<TransactionProps[] | any>([]);
  const [limitNum] = useState(30);

  const { isCopy, copyContent, isCopyPopup } = useCopyContent(address);

  const { lastCardRef, pageNum } = useLastCardRef();

  useEffect(() => {
    return () => {
      setPosition(null);
    };
  }, []);

  useEffect(() => {
    if (address || type || filtered || tokenToSorted) {
      setTx([]);
    }
  }, [address, type, filtered, tokenToSorted]);

  useEffect(() => {
    if (filtered && addressData?.tokens?.length) {
      addFilter(
        addressData.tokens.find(
          (token: TokenType) => token.contract === filtered,
        ),
      );
    }
    if (!loading || errorData) {
      if (addressData && addressData?.meta?.totalPages > pageNum) {
        setPosition(getDataForAddress, address?.trim(), {
          filtered:
            addressData && addressData.filters ? addressData.filters : [],
          selectedTokenFilter:
            selectedToken && selectedToken?.contract
              ? selectedToken.contract
              : filtered,
          limit: limitNum,
          type: transactionType,
          page: pageNum,
        });
      } else {
        setPosition(getDataForAddress, address?.trim(), {
          filtered:
            addressData && addressData.filters ? addressData.filters : [],
          selectedTokenFilter:
            selectedToken && selectedToken?.contract
              ? selectedToken.contract
              : filtered,
          limit: limitNum,
          type: transactionType,
          page: pageNum,
        });
      }
    }
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
  useEffect(() => {
    if (addressData && addressData?.transactions) {
      setTx((prevState: TransactionProps[]) => {
        const compareState = [...prevState, ...addressData.transactions];
        const addressDataState = [...addressData.transactions];
        if (type === 'ERC-20_Tx' && !filtered) {
          const newTx = addressDataState.sort((a, b) => b.block - a.block);
          return newTx;
        }
        if (type === 'ERC-20_Tx' && filtered) {
          const newTx = addressDataState.sort((a, b) => b.block - a.block);
          return newTx;
        }
        if (!type || type === 'transfers') {
          const newTx: TransactionProps[] = toUniqueValueByBlock(compareState);
          const transfersDataTx: TransactionProps[] = newTx.filter(
            (item: TransactionProps) => item.method === 'Transfer',
          );
          return type === 'transfers' ? transfersDataTx : newTx;
        }
      });
    }
  }, [addressData]);

  useEffect(() => {
    if (addressData && addressData?.tokens && !selectedToken) {
      setSelectedToken(
        addressData.tokens.find(
          (token: TokenType) => token.contract === filtered,
        ),
      );
    }
  }, [addressData]);
  const [copyBtnRef, isHover] = useHover();
  const { width } = useWindowSize();

  return (
    <Content>
      <section className="address_details">
        <Content.Header>
          <h1 className="address_details_h1">
            Address Details
            <div className="address_details_copy">
              {address}
              <button
                ref={copyBtnRef}
                className="address_details_copy_btn"
                onClick={copyContent}
              >
                {isCopy ? <ContentCopyed /> : <ContentCopy />}

                <div className="address_details_copy_btn_copyed">
                  {width > 768 ? (
                    !isCopy && isHover ? (
                      <CopyPopUp x={10} y={20} values="Copy" />
                    ) : (
                      null ||
                      (!isCopyPopup && (
                        <CopyPopUp x={3} y={20} values="Copyed" />
                      ))
                    )
                  ) : null}
                </div>
              </button>
            </div>
          </h1>
          <div className="address_details_section">
            <div className="address_details_info">
              <OverallBalance
                addressBalance={
                  addressData &&
                  addressData.balance &&
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
        </Content.Header>
        <Content.Body isLoading={filtered ? !loading : true}>
          <Tabs
            lastCardRef={lastCardRef}
            onClick={setSelectedToken}
            selectedToken={selectedToken}
            transactionType={transactionType}
            data={tx ? tx : []}
            setTransactionType={setTransactionType}
          />
        </Content.Body>
      </section>
    </Content>
  );
};
