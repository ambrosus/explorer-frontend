import AddressesBody from 'components/Addresses/AddressesBody';
import AddressesHeader from 'components/Addresses/AddressesHeader';
import AddressesSort from 'components/Addresses/AddressesSort';
import MainInfoAddresses from 'components/Addresses/MainInfoAddresses';
import { Content } from 'components/Content';
import Loader from 'components/Loader';
import { useTypedSelector } from 'hooks/useTypedSelector';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { getAccountsData } from 'services/accounts.service';
import removeArrayDuplicates from 'utils/helpers';

export const Addresses = () => {
  const [accounts, setAccounts] = React.useState<any>([]);
  const [sortTerm, setSortTerm] = React.useState('address');
  const { ref, inView } = useInView();
  const { loading } = useTypedSelector((state: any) => state.app);

  useEffect(() => {
    const next = '';
    getAccountsData(sortTerm, next).then((res: any) => {
      setAccounts(res);
    });
  }, []);

  useEffect(() => {
    const next = '';
    getAccountsData(sortTerm, next).then((res: any) => {
      setAccounts(res);
    });
  }, [sortTerm]);

  useEffect(() => {
    if (inView) {
      const next = accounts.pagination.next;
      getAccountsData(sortTerm, next).then((res: any) => {
        setAccounts((prev: any) => {
          return {
            ...prev,
            data: removeArrayDuplicates([...prev.data, ...res.data]),
            pagination: res.pagination,
          };
        });
      });
    }
  }, [inView]);

  return (
    <Content>
      <Content.Header>
        <MainInfoAddresses />
        <div className="loader">{loading && <Loader />}</div>
      </Content.Header>
      <Content.Body>
        <div className="addresses__mainTable">
          <AddressesSort sortTerm={sortTerm} setSortTerm={setSortTerm} />
          <div className="addresses__table">
            <AddressesHeader />
            {accounts && accounts.data && accounts.data.length
              ? accounts.data.map((account: any, index: number) => {
                  return account && accounts.data.length - 1 === index ? (
                    <AddressesBody
                      key={account && account._id ? account._id : index}
                      lastCardRef={ref}
                      isContract={
                        account && account.isContract
                          ? account.isContract
                          : null
                      }
                      address={
                        account && account.address ? account.address : null
                      }
                      balance={
                        account && account.balance ? account.balance : null
                      }
                      rank={index + 1}
                      txCount={
                        account && account.totalTx ? account.totalTx : null
                      }
                    />
                  ) : (
                    <AddressesBody
                      key={account && account._id ? account._id : index}
                      isContract={
                        account && account.isContract
                          ? account.isContract
                          : null
                      }
                      address={
                        account && account.address ? account.address : null
                      }
                      balance={
                        account && account.balance ? account.balance : null
                      }
                      rank={index + 1}
                      txCount={
                        account && account.totalTx ? account.totalTx : null
                      }
                    />
                  );
                })
              : null}
          </div>
        </div>
      </Content.Body>
    </Content>
  );
};
