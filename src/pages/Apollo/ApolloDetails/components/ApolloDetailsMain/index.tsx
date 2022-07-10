import { TParams } from '../../../../../types';
import CopyBtn from 'components/CopyBtn';
import React from 'react';
import { useParams } from 'react-router-dom';

const AtlasDetailsBalance = ({ apollo }: any) => {
  const { address }: TParams = useParams();

  const isOffline = apollo?.status === 'OFFLINE' ? '#bfc9e0' : undefined;

  return (
    <div className="apollo_details_main">
      <div className="apollo_details_main_nd">
        <h1>ND Apollo</h1>
        <div
          className="apollo_details_main_online"
          style={{ color: isOffline }}
        >
          {apollo?.status ?? ''}
        </div>
      </div>
      <div className="apollo_details_main_address">
        <div className="apollo_details_main_cell universall_bold">Address</div>
        <div style={{ display: 'flex', gap: 16 }}>
          <div className="address_content">{address}</div>
          <CopyBtn />
        </div>
      </div>
    </div>
  );
};

export default AtlasDetailsBalance;
