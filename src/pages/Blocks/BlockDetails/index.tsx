import { Content } from '../../../components/Content';
import Loader from '../../../components/Loader';
import useSortData from '../../../hooks/useSortData';
import {
  getBlockData,
  getBlockTransactionsData,
} from '../../../services/block.service';
import { TParams } from '../../../types';
import DataTitle from '../components/DataTitle';
import BlockBody from './components/BlockBody';
import BlockHeader from './components/BlockHeader';
import BlockHeaderInfo from './components/BlockHeaderInfo';
import MainInfoBlockTable from './components/MainInfoBlockTable';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const BlockDetails = () => {
  const { address }: TParams = useParams();

  const [block, setBlock] = useState<any>(null);

  const { ref, renderData, loading } = useSortData(
    getBlockTransactionsData,
    address,
  );
  const getData = async () => {
    const apolloData = await getBlockData(address as string);
    setBlock(apolloData.data);
  };
  useEffect(() => {
    getData();
  }, []);
  // console.log('block',block);

  return (
    <Content>
      <Content.Header>
        <div className="block_main_title">
          <div>
            <h1 className="block_main_title_heading">
              Blocks{' '}
              <span className="block_main_title_heading_block">{address}</span>
            </h1>
          </div>
          <div>
            <div className="block_main_title_validator">
              Validator{' '}
              <span className="block_main_title_validator_address">
                {block?.miner ?? ''}
              </span>
            </div>
          </div>
        </div>
        <BlockHeaderInfo />
        <MainInfoBlockTable />
      </Content.Header>
      <Content.Body>
        <div className="blocks_main">
          <DataTitle title="Transactions" />
          <div className="blocks_main_table">
            <BlockHeader />
            {renderData && renderData.data && renderData.data.length
              ? renderData.data.map((item: any, index: number) =>
                  renderData.data.length - 1 === index &&
                  renderData?.pagination?.hasNext ? (
                    <BlockBody lastCardRef={ref} key={index} item={item} />
                  ) : (
                    <BlockBody key={index} item={item} />
                  ),
                )
              : null}
          </div>
          {!loading && renderData?.pagination?.hasNext && <Loader />}
        </div>
      </Content.Body>
    </Content>
  );
};
