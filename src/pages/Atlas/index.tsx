import useSortData from '../../hooks/useSortData';
import { getAtlasesData } from '../../services/atlas.service';
import AtlasBlocksBody from './components/AtlasBlocksBody';
import AtlasBlocksHeader from './components/AtlasBlocksHeader';
import AtlasBlocksSort from './components/AtlasBlocksSort';
import MainInfoAtlas from './components/MainInfoAtlas';
import { Content } from 'components/Content';
import Loader from 'components/Loader';
import React from 'react';
import TabsNew from "../Transactions/components/TabsNew";
import API from '../../API/api';
import {TParams} from "../../types";
import {useParams} from "react-router-dom";
import {apolloDetailsSorting} from "../../utils/sidePages";
import {TAtlasSortProps} from "./atlasBlocks.interface";

const sortOptions: TAtlasSortProps[] = [
  {
    label: 'Address',
    value: 'address',
  },
  {
    label: 'Total bundles',
    value: 'totalBundles',
  },
  {
    label: 'Balance',
    value: 'balance',
  },
  {
    label: 'Stake',
    value: 'stake',
  },
];

export const Atlas = () => {
  const { address }: TParams = useParams();

  const { ref, sortTerm, setSortTerm, renderData, loading } = useSortData(
    getAtlasesData,
    'totalBundles',
  );



  return (
    <Content>
      <Content.Header>
        <MainInfoAtlas />
      </Content.Header>
      <Content.Body>
        <div className="atlas_main">
          {/*<AtlasBlocksSort sortTerm={sortTerm} setSortTerm={setSortTerm} />*/}
          <div className="atlas_main_table">
            <TabsNew
              tableHeader={() => <AtlasBlocksHeader/>}
              sortOptions={sortOptions}
              fetchData={API.getAtlas}
              initSortTerm={'totalBundles'}
              fetchParams={{ sort: 'totalBundles' }}
              render={(list: any) => (
                list.map((el: any, index: any) => (
                  <AtlasBlocksBody
                    key={index}
                    index={index + 1}
                    item={el}
                  />
                ))
              )}
            />
            {/*{renderData && renderData.data && renderData.data.length*/}
            {/*  ? renderData.data.map((item: any, index: number) =>*/}
            {/*      renderData.data.length - 1 === index &&*/}
            {/*      renderData?.pagination?.hasNext ? (*/}
            {/*        <AtlasBlocksBody*/}
            {/*          lastCardRef={ref}*/}
            {/*          key={index}*/}
            {/*          index={index + 1}*/}
            {/*          item={item}*/}
            {/*        />*/}
            {/*      ) : (*/}
            {/*      ),*/}
            {/*    )*/}
            {/*  : null}*/}
          </div>
          {/*{!loading && renderData?.pagination?.hasNext && <Loader />}*/}
        </div>
      </Content.Body>
    </Content>
  );
};
