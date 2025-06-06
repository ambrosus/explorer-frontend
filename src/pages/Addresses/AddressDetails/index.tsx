import API2 from '../../../API/newApi';
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
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';

const AddressDetails = () => {
  const { address, tokenAddress } = useParams();
  const navigate = useNavigate();
  const [selectedToken, setSelectedToken]: any = useState(null);
  const [addressData, setAddressData] = useState({
    balance: '',
    tokens: [],
    isContract: false,
  });

  useEffect(() => {
    API2.getAccountTxs({ type: 'all', address }).then((response: any) => {
      if (response) {
        setAddressData({
          balance: response.account.balance.wei,
          tokens: response.tokens.filter(
            (el: any) =>
              el.address !== '0xd8dd0273D31c1cd9Dba104DaCA7C1dfEE4f7b805',
          ),
          isContract: response.account.isContract,
        });
      }
    });
  }, [address]);

  useEffect(() => {
    if (addressData.tokens.length && tokenAddress) {
      const token = addressData.tokens.find(
        (el: any) => el.address === tokenAddress,
      );
      setSelectedToken(token);
    }
  }, [tokenAddress, addressData]);

  const handleToken = (token: any) => {
    if (token) {
      navigate(`/address/${address}/token/${token.address}`);
    } else {
      navigate(`/address/${address}`);
    }
    setSelectedToken(token);
  };

  const { FOR_TABLET } = useDeviceSize();

  const renderAddressBlock = (tx: any, isTokens: boolean) => (
    <AddressBlock
      type={isTokens ? 'ERC-20_Tx' : ''}
      txhash={tx.hash}
      method={tx.type}
      from={tx.from}
      to={tx.to}
      date={moment(tx.timestamp * 1000).fromNow()}
      block={tx.blockNumber}
      amount={tx.value.ether}
      txfee={tx.gasCost.ether}
      token={`${tx.token ? tx.token.name : 'AMB'}`}
      symbol={`${tx.token ? tx.token.symbol : 'AMB'}`}
      isTableColumn={isTokens ? 'address_blocks_erc20' : 'address_blocks_cells'}
      isIcon={true}
      inners={tx.inners}
      status={tx.status}
      onClick={handleToken}
      tokenData={tx.token}
      tokens={addressData.tokens}
    />
  );

  const fetchParams = useMemo(
    () => ({
      type: '',
      page: '',
      address,
    }),
    [address],
  );

  const tokenFetchParams = useMemo(
    () => ({
      page: '',
      userAddress: address,
      tokenAddress: selectedToken?.address,
    }),
    [address, selectedToken],
  );

  return (
    <Content>
      <Helmet>
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://airdao.io/explorer/addresses/" />
        <title>Addresses | AirDAO Network Explorer</title>
        <meta
          name="description"
          content="Explore AirDAO Network Addresses: Address, Tx Count, Balance, Holding"
        />
      </Helmet>
      <section
        className={`address_details ${
          !!selectedToken ? 'address_details_sorted-by-token' : ''
        }`}
      >
        <Content.Header>
          <h1 className="address_details_h1">
            {addressData.isContract
              ? 'Smart Contract Details'
              : 'Address Details'}
            <div
              className="address_details_copy"
              style={{ fontSize: addressData.isContract ? 18 : '2.3rem' }}
            >
              {addressData.isContract && (
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
                onClick={handleToken}
              />
            </div>

            {selectedToken && (
              <FilteredToken
                selectedToken={selectedToken}
                setSelectedToken={handleToken}
              />
            )}
          </div>
        </Content.Header>
        <Content.Body>
          {selectedToken ? (
            <TabsNew
              tabs={[{ title: 'Token', value: 'tokens' }]}
              fetchData={API2.getTokenTxs}
              initTab="tokens"
              fetchParams={tokenFetchParams}
              render={(txs: Account[], isTokens: boolean) => (
                <table>
                  <tbody>
                    {txs.map((tx: any) => renderAddressBlock(tx, isTokens))}
                  </tbody>
                </table>
              )}
            />
          ) : (
            <TabsNew
              isContract={addressData.isContract}
              tabs={transactionFilters}
              fetchData={API2.getAccountTxs}
              initTab="all"
              fetchParams={fetchParams}
              render={(txs: any[], isTokens: boolean) => {
                const uniqueTxs = Array.from(
                  new Map(txs.map((tx) => [tx.hash, tx])).values(),
                );
                return (
                  <tbody>
                    {uniqueTxs.map((tx: any) =>
                      renderAddressBlock(tx, isTokens),
                    )}
                  </tbody>
                );
              }}
            />
          )}
        </Content.Body>
      </section>
    </Content>
  );
};
export default React.memo(AddressDetails);
