import API2 from '../../API/newApi';
import TabsNew from '../Transactions/components/TabsNew';
import AddressesBody from './components/AddressesBody';
import AddressesHeader from './components/AddressesHeader';
import MainInfoAddresses from './components/MainInfoAddresses';
import { Content } from 'components/Content';
import React from 'react';
import { Helmet } from 'react-helmet';

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
      <Helmet>
        <link rel="canonical" href="https://airdao.io/explorer/address/" />
        <title>Addresses | AirDAO Network Explorer</title>
        <meta
          name="description"
          content="Explore AirDAO Network Addresses: Address, Tx Count, Balance, Holding"
        />
      </Helmet>
      <Content.Header>
        <MainInfoAddresses />
      </Content.Header>
      <Content.Body>
        <TabsNew
          tableHeader={() => <></>}
          sortOptions={sortOptions}
          fetchData={API2.getAddresses}
          initSortTerm={'balance'}
          fetchParams={{ sort: '', page: '' }}
          label="Addresses"
          render={(accounts: any) => (
            <table>
              <thead>
                <AddressesHeader />
              </thead>
              <tbody>
                {accounts.map((account: any, index: any) => (
                  <AddressesBody
                    key={account._id}
                    isContract={account.isContract}
                    address={account.address}
                    balance={account.balance}
                    rank={index + 1}
                    txCount={account.totalTx}
                  />
                ))}
              </tbody>
            </table>
          )}
        />
      </Content.Body>
    </Content>
  );
};
