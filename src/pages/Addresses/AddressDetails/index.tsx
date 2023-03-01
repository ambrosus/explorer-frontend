import API from '../../../API/api';
import { useActions } from '../../../hooks/useActions';
import { transactionFilters } from '../../../utils/sidePages';
import { Account } from '../../Atlas/atlas.interface';
import TabsNew from '../../Transactions/components/TabsNew';
import AddressBlock from './components/AddressBlocks';
import { Content } from 'components/Content';
import CopyBtn from 'components/CopyBtn';
import FilteredToken from 'components/FilteredToken';
import OverallBalance from 'components/OveralBalance';
import Token from 'components/Token';
import { formatEther } from 'ethers/lib/utils';
import useDeviceSize from 'hooks/useDeviceSize';
import { useTypedSelector } from 'hooks/useTypedSelector';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { shallowEqual } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getDataForAddress } from 'services/address.service';
import { TParams } from 'types';

const AddressDetails = () => {
  const { address } = useParams();
  const { getContractAddressData } = useActions();

  const { data: sourcifyData } = useTypedSelector((state) => state?.sourcify);
  const { accountInfo, contractInfo } = sourcifyData || {};
  const { isContract } = accountInfo?.data || false;

  const [tokensTabActive, setTokensTabActive] = useState(null);
  const [selectedToken, setSelectedToken]: any = useState(null);
  const [addressData, setAddressData] = useState({
    balance: '',
    tokens: [],
  });

  useEffect(() => {
    getContractAddressData(address);
  }, [address]);

  useEffect(() => {
    console.log(isContract);
  }, [isContract]);

  useEffect(() => {
    API.getAccountTxs({ type: 'all', address }).then((response: any) => {
      if (response) {
        console.log(response.tokens);
        setAddressData({
          balance: response.account.balance.wei,
          tokens: response.tokens,
        });
      }
    });
  }, []);

  // useEffect(() => {
  // if (address?.trim() === '0x0000000000000000000000000000000000000000') {
  //   window.location.replace(`/explorer/notfound`);
  // }
  //
  // if (address) {
  //   API.searchItem(address)
  //     .then((data: any) => {
  //       !data.meta.search && window.location.replace(`/explorer/notfound`);
  //     })
  //     .catch(() => {
  //       if (addressData.balance === '') {
  //         window.location.replace(`/explorer/notfound`);
  //       }
  //     });
  // }
  // }, [addressData]);

  const { FOR_TABLET } = useDeviceSize();

  return (
    <Content>
      <Helmet>
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://airdao.io/explorer/addresses/" />
      </Helmet>
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
                  addressData.balance &&
                  Number(formatEther(addressData.balance)).toFixed(2)
                }
                address={address || ''}
              />

              <Token
                addressData={addressData}
                selectedToken={selectedToken}
                onClick={setSelectedToken}
              />
            </div>

            {selectedToken && (
              <FilteredToken
                selectedToken={selectedToken}
                setSelectedToken={setSelectedToken}
              />
            )}
          </div>
        </Content.Header>
        <Content.Body>
          <TabsNew
            contractInfo={
              isContract
                ? {
                    data: contractInfo,
                    address,
                  }
                : null
            }
            tabs={
              selectedToken
                ? [{ title: 'Token', value: 'token' }]
                : transactionFilters
            }
            fetchData={API.getAccountTxs}
            initTab="all"
            fetchParams={{
              type: '',
              page: '',
              address,
              tokenAddress: selectedToken ? selectedToken.address : '',
            }}
            render={(txs: Account[]) =>
              txs.map((tx: any, i: number) => (
                <AddressBlock
                  key={i}
                  txhash={tx.hash}
                  method={tx.type.split(':')[0]}
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
              ))
            }
          />
        </Content.Body>
      </section>
    </Content>
  );
};
export default React.memo(AddressDetails);
