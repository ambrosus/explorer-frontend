import React from "react";
import { Content } from 'components/Content';
import useSortData from 'hooks/useSortData';
import BundleBlocksBody from 'pages/Bundles/components/BundleBlocksBody';
import BundleBlocksHeader from 'pages/Bundles/components/BundleBlocksHeader';
import BundleMainTabs from 'pages/Bundles/components/BundleMainTabs';
import { getBundleInfo } from 'services/bundle.service';
import API from "../../API/api";
import TabsNew from "../Transactions/components/TabsNew";

export const Bundles = () => {
  const { renderData: appData } = useSortData(getBundleInfo, '');

  return (
    <Content>
      <Content.Header>
        <BundleMainTabs data={appData} />
      </Content.Header>
      <Content.Body>
        <TabsNew
          tableHeader={() => <BundleBlocksHeader />}
          fetchData={API.getBundles}
          fetchParams={{ next: '' }}
          label="Recent Bundles"
          render={(list: any) =>
            list.map((el: any, index: any) => (
              <BundleBlocksBody key={index} index={index + 1} item={el} />
            ))
          }
        />
      </Content.Body>
    </Content>
  );
};
