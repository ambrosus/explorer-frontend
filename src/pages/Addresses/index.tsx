import API from '../../API/api';
import TabsNew from '../Transactions/components/TabsNew';
import AddressesBody from './components/AddressesBody';
import AddressesHeader from './components/AddressesHeader';
import MainInfoAddresses from './components/MainInfoAddresses';
import { Content } from 'components/Content';
import React from 'react';

const sortOptions = [
  {
    label: 'Address',
    value: 'address',
  },
  {
    label: 'Balance',
    value: 'balance',
  },
  {
    label: 'Total Tx',
    value: 'totalTx',
  },
];

export const Addresses = () => {
  return (
    <Content>
      <Content.Header>
        <MainInfoAddresses />
      </Content.Header>
      <Content.Body>
        <div className="addresses_main_table">
          <div className="addresses_table">
            <TabsNew
              tableHeader={() => <AddressesHeader />}
              sortOptions={sortOptions}
              fetchData={API.getAddresses}
              initSortTerm={'balance'}
              fetchParams={{ sort: '', page: '' }}
              label="Addresses"
              render={(accounts: any) =>
                accounts.map((account: any, index: any) => (
                  <AddressesBody
                    key={account._id}
                    isContract={account.isContract}
                    address={account.address}
                    balance={account.balance}
                    rank={index + 1}
                    txCount={account.totalTx}
                  />
                ))
              }
            />
          </div>
        </div>
      </Content.Body>
    </Content>
  );
};
