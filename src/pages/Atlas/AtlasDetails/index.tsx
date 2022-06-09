import API from '../../../API/api';
import { toUniqueValueByBlock } from '../../../utils/helpers';
import {
  TokenType,
  TransactionProps,
} from '../../Addresses/AddressDetails/address-details.interface';
import AtlasDetailsBalance from './components/AtlasDetailsBalance';
import AtlasDetailsMain from './components/AtlasDetailsMain';
import AtlasDetailsMiningStats from './components/AtlasDetailsMiningStats';
import { Content } from 'components/Content';
import Tabs from 'components/Tabs';
import { useActions } from 'hooks/useActions';
import useCopyContent from 'hooks/useCopyContent';
import useDeviceSize from 'hooks/useDeviceSize';
import { useTypedSelector } from 'hooks/useTypedSelector';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { shallowEqual } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getDataForAddress } from 'services/address.service';
import { TParams } from 'types';

export const AtlasDetails = () => {
  return (
    <Content>
      <Content.Header>
        <div className="apollo_details_header">
          <AtlasDetailsMain />
          <AtlasDetailsBalance />
          <AtlasDetailsMiningStats />
        </div>
      </Content.Header>
      <Content.Body>
        {/* <Tabs
          pageNum={pageNum}
          lastCardRef={lastCardRef}
          onClick={setSelectedToken}
          selectedToken={selectedToken}
          transactionType={transactionType}
          data={tx ? tx : []}
          setTransactionType={setTransactionType}
          isIcon={false}
        /> */}
      </Content.Body>
    </Content>
  );
};
