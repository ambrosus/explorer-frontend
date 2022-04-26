import API from "API/api";
import ContentCopy from "assets/icons/ContentCopy";
import { Content } from "components/Content";
import FilteredToken from "components/FilteredToken";
import OverallBalance from "components/OveralBalance";
import Tabs from "components/Tabs";
import Token from "components/Token";
import { formatEther } from "ethers/lib/utils";
import { useActions } from "hooks/useActions";
import { useTypedSelector } from "hooks/useTypedSelector";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { shallowEqual } from "react-redux";
import { useParams } from "react-router-dom";

import { TParams } from "../../../types";

import { TokenType } from "./types";

export const AddressDetails = () => {
  const { address, type, filtered, tokenToSorted }: TParams = useParams();
  const { setPosition, addFilter } = useActions();
  const { filters } = useTypedSelector(
    (state) => state.tokenFilters,
    shallowEqual
  );
  const {
    loading,
    data: addressData,
    error: errorData
  } = useTypedSelector((state: any) => state.position);
  const [transactionType, setTransactionType] = useState(type);
  const [selectedToken, setSelectedToken] = useState<TokenType | null>(null);
  const [tx, setTx] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [limitNum] = useState(40);

  const observer = useRef();

  const lastCardRef = useCallback(node => {
    if (loading) return;
    if (observer.current) { // @ts-ignore
      observer.current.disconnect();
    }
    // @ts-ignore
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && addressData && pageNum < addressData?.meta?.totalPages) {
        setPageNum(prevNum => prevNum + 1);
      }
    });
    if (node) {
      // @ts-ignore
      observer.current.observe(node);
    }
  }, [loading]);

  useEffect(() => {
    if (filtered && addressData?.tokens?.length) {
      addFilter(
        addressData.tokens.find((token: TokenType) => token.contract === filtered)
      );
    }
    if (type) {
      setTx([]);
    }
    if (!loading || errorData) {
      if (addressData && addressData?.meta?.totalPages > pageNum) {
        setPosition(API.getDataForAddress, address?.trim(), {
          filtered: addressData && addressData.filters ? addressData.filters : [],
          selectedTokenFilter:
            selectedToken && selectedToken?.contract ? selectedToken.contract : filtered,
          limit: limitNum,
          type: transactionType,
          page: pageNum
        });
      } else {
        setPosition(API.getDataForAddress, address?.trim(), {
          filtered: addressData && addressData.filters ? addressData.filters : [],
          selectedTokenFilter:
            selectedToken && selectedToken?.contract ? selectedToken.contract : filtered,
          limit: limitNum,
          type: transactionType,
          page: pageNum
        });
      }

    }
  }, [filters, transactionType, selectedToken, tokenToSorted, address, pageNum, type]);

  useEffect(() => {

    if (addressData && addressData?.transactions) {
      // @ts-ignore
      setTx(prevState => [...prevState, ...addressData.transactions]);
    } else {
      setTx([]);
    }
  }, [addressData]);

  useEffect(() => {
    if (addressData && addressData?.tokens && !selectedToken) {
      setSelectedToken(
        addressData.tokens.find(
          (token: TokenType) => token.contract === filtered
        )
      );
    }
  }, [addressData]);

  const copyContent = () => address && navigator.clipboard.writeText(address);

  return (
    <Content>
      <section className="addressDetails">
        <Content.Header>
          <h1 className="addressDetails__h1">
            Address Details{" "}
            <span className="addressDetails__h1-span"> {address}</span>
            <button className="addressDetails__h1-btn" onClick={copyContent}>
              <ContentCopy fill="#808A9D" />
            </button>
          </h1>
          <div className="addressDetails__section">
            <div className="addressDetails__info">
              <OverallBalance
                addressBalance={
                  addressData && addressData.balance
                    ? Number(formatEther(addressData.balance)).toFixed(2)
                    : 0
                }
              />

              <Token selectedToken={selectedToken} onClick={setSelectedToken} />
            </div>
            {selectedToken && (
              <FilteredToken setSelectedToken={setSelectedToken} />
            )}
          </div>
        </Content.Header>
        <Content.Body isLoading={Boolean(tx && tx.length)}>
            <Tabs
              onClick={setSelectedToken}
              selectedToken={selectedToken}
              transactionType={transactionType}
              data={tx}
              setTransactionType={setTransactionType}
            />
          {addressData?.meta?.totalPages < 1 || type  !== 'ERC-20_Tx' && <div ref={lastCardRef} style={{height:100}}></div>}
        </Content.Body>
      </section>
    </Content>
  );
};
