import { Account } from './addresses.interface';
import AddressesBody from './components/AddressesBody';
import AddressesHeader from './components/AddressesHeader';
import AddressesSort from './components/AddressesSort';
import MainInfoAddresses from './components/MainInfoAddresses';
import { Content } from 'components/Content';
import Loader from 'components/Loader';
import useSortData from 'hooks/useSortData';
import { useTypedSelector } from 'hooks/useTypedSelector';
import React from 'react';
import { getAccountsData } from 'services/accounts.service';
import {Helmet} from "react-helmet";

export const Addresses = () => {
  const { ref, sortTerm, setSortTerm, renderData, loading, setRenderData } =
    useSortData(getAccountsData, 'balance');
  const isQueryContracts = sortTerm === 'contracts';

  const { data } = useTypedSelector((state) => state.app);

  return (
    <Content>
      <Helmet>
        <link rel="canonical" href="https://airdao.io/explorer/addresses/"/>
      </Helmet>
      <Content.Header>
        <MainInfoAddresses />
      </Content.Header>
      <Content.Body>
        <div className="addresses_main_table">
          <AddressesSort sortTerm={sortTerm} setSortTerm={setSortTerm} />
          <div className="addresses_table">
            <AddressesHeader />
            {renderData && renderData.data && renderData.data.length
              ? !isQueryContracts
                ? renderData.data.map((account: Account, index: number) => {
                    return (
                      <AddressesBody
                        key={account._id}
                        lastCardRef={
                          account && renderData.data.length - 1 === index
                            ? ref
                            : null
                        }
                        isContract={account.isContract}
                        address={account.address}
                        balance={account.balance}
                        rank={index + 1}
                        txCount={account.totalTx}
                      />
                    );
                  })
                : renderData.data
                    .filter((acc: any) => acc.isContract === true)
                    .map((account: Account, index: number) => {
                      return (
                        <AddressesBody
                          key={account._id}
                          lastCardRef={
                            account &&
                            renderData.data.filter(
                              (acc: any) => acc.isContract === true,
                            ).length -
                              1 ===
                              index
                              ? ref
                              : null
                          }
                          isContract={account.isContract}
                          address={account.address}
                          balance={account.balance}
                          rank={index + 1}
                          txCount={account.totalTx}
                        />
                      );
                    })
              : null}
          </div>
          {loading && (
            <div style={{ top: '-20px', position: 'relative' }}>
              <Loader />
            </div>
          )}
        </div>
      </Content.Body>
    </Content>
  );
};
