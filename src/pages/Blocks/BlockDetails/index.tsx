import { Content } from '../../../components/Content';
import Loader from '../../../components/Loader';
import { useActions } from '../../../hooks/useActions';
import useSortData from '../../../hooks/useSortData';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import {
  getBlockData,
  getBlockTransactionsData,
} from '../../../services/block.service';
import { TParams } from '../../../types';
import DataTitle from '../components/DataTitle';
import BlockBody from './components/BlockBody';
import BlockHeader from './components/BlockHeader';
import API2 from 'API/newApi';
import HeadInfo from 'components/HeadInfo';
import useDeviceSize from 'hooks/useDeviceSize';
import moment from 'moment';
import React, { memo, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { sliceData10, sliceData5 } from 'utils/helpers';

export interface IBlock {
  miner: string;
  number: number;
  blockRewards: any[];
  totalTransactions: number;
  size: number;
  timestamp: number;
  parentHash: string;
  hash: string;
  stateRoot: string;
  extraData: string;
}

interface IBlocksData<T> {
  // data: { data: T[] | undefined } | null;
  data: { data: { block: T[] | undefined } } | null;
  isError: boolean;
  isLoading: boolean;
}

export const BlockDetails = memo(() => {
  const { setAppDataAsync } = useActions();
  const { address = '' }: TParams = useParams();

  const [block, setBlock] = useState<any>(null);
  const navigate = useNavigate();
  const { data: appData } = useTypedSelector((state: any) => state.app);
  const {
    number,
    blockRewards = 0,
    totalTransactions = 0,
    size = 0,
    timestamp = 0,
    parentHash = '',
    hash = 0,
    stateRoot = 0,
    extraData,
  } = block || {};

  const txCount = blockRewards?.length + totalTransactions || 0;
  const { lastBlock } = appData?.netInfo || 0;
  const confirmations = lastBlock?.number - number;

  const blockStatus = (confirmations: any) => {
    return confirmations > 0 ? 'Confirmed' : 'Unconfirmed';
  };

  const { data, isError, isLoading } = useQuery(
    [`get data for ${address}`, address],
    () => API2.getBlock(address),
    {
      initialDataUpdatedAt: 0,
      refetchInterval: 4000,
      // onSuccess: (data: any) => {
      //   if (!data) {
      //     navigate(`/notfound`);
      //   }
      // },
    },
  ) as IBlocksData<IBlock>;

  const { ref, renderData, loading } = useSortData(
    getBlockTransactionsData,
    address,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setAppDataAsync();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    API2.getBlock(address).then((res) => console.log(res));

    if (!isLoading) setBlock(data?.data.block);
  }, [isLoading]);

  if (isError) navigate(`/notfound`);
  const { FOR_TABLET } = useDeviceSize();

  const itemFirst: any = [
    {
      name: 'STATUS',
      value: blockStatus(confirmations),
      style: {
        color: '#1acd8c',
      },
    },
    {
      name: 'CONFIRMATIONS',
      value: confirmations < 0 ? 0 : confirmations || 0,
    },
    {
      name: 'TXS IN THIS BLOCK',
      value: txCount,
    },
    {
      name: 'SIZE',
      value: size,
    },
    {
      name: 'CREATED',
      value: moment(timestamp * 1000).fromNow(),
    },
  ];

  const itemSecond: any = [
    {
      name: 'HASH',
      value: sliceData10(hash, FOR_TABLET ? 20 : 10),
    },
    {
      name: 'PARENT HASH',
      value: (
        <NavLink
          className="address_blocks_icon head_info_cells_secondary"
          to={`/blocks/${parentHash}`}
        >
          {sliceData10(parentHash, FOR_TABLET ? 20 : 10)}
        </NavLink>
      ),
    },
    {
      name: 'STATE ROOT HASH ',
      value: sliceData10(stateRoot, FOR_TABLET ? 20 : 10),
    },
    {
      name: 'DATA',
      value: sliceData10(extraData, FOR_TABLET ? 20 : 10),
    },
  ];

  return (
    <Content isExpanded>
      <Content.Header>
        <div className="block_main_title">
          <div className="block_main_title__in">
            <h1 className="block_main_title_heading">Block details</h1>
            <span className="block_main_title_heading_block">
              {block?.number ?? 0}
            </span>
          </div>
          <div className="block_main_title__in">
            <div className="block_main_title_validator">Validator </div>
            <NavLink
              to={`/apollo/${block?.miner}`}
              className="block_main_title_address"
            >
              {block?.miner ?? ''}
            </NavLink>
          </div>
        </div>

        <HeadInfo data={itemFirst} className="head_info" />
        <HeadInfo
          data={itemSecond}
          styleCell={FOR_TABLET ? { flexBasis: '50%' } : { flexBasis: '64px' }}
          className="head_info"
        />
      </Content.Header>
      {renderData?.data?.length && (
        <Content.Body>
          <div className="blocks_main">
            <DataTitle title="Transactions" />
            <div className="blocks_main_table">
              <BlockHeader />
              {renderData?.data?.length
                ? renderData.data.map((item: any, index: number) => (
                    <BlockBody
                      lastCardRef={
                        renderData?.data?.length - 1 === index &&
                        renderData?.pagination?.hasNext
                          ? ref
                          : undefined
                      }
                      key={index}
                      item={item}
                    />
                  ))
                : null}
            </div>
            {!loading && renderData?.pagination?.hasNext && <Loader />}
          </div>
        </Content.Body>
      )}
    </Content>
  );
});
