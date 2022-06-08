import { Account } from './addresses.interface';
import AddressesBody from './components/AddressesBody';
import AddressesHeader from './components/AddressesHeader';
import AddressesSort from './components/AddressesSort';
import MainInfoAddresses from './components/MainInfoAddresses';
import { Content } from 'components/Content';
import Loader from 'components/Loader';
import useSortData from 'hooks/useSortData';
import { getAccountsData } from 'services/accounts.service';
import {useEffect} from "react";

export const Addresses = () => {
  const { ref, sortTerm, setSortTerm, renderData, loading } =
    useSortData(getAccountsData);


  return (
    <Content>
      <Content.Header>
        <MainInfoAddresses />
      </Content.Header>
      <Content.Body>
        <div className="addresses_main_table">
          <AddressesSort sortTerm={sortTerm} setSortTerm={setSortTerm} />
          <div className="addresses_table">
            <AddressesHeader />
            {renderData && renderData.data && renderData.data.length
              ? renderData.data.map((account: Account, index: number) => {
                  return account && renderData.data.length - 1 === index ? (
                    <AddressesBody
                      key={account._id}
                      lastCardRef={ref}
                      isContract={account.isContract}
                      address={account.address}
                      balance={account.balance}
                      rank={index + 1}
                      txCount={account.totalTx}
                    />
                  ) : (
                    <AddressesBody
                      key={account._id}
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
          {loading && <Loader />}
        </div>
      </Content.Body>
    </Content>
  );
};
