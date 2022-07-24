import CopyBtn from 'components/CopyBtn';
import React from 'react';
import { useParams } from 'react-router-dom';
import { TParams } from 'types';

const AtlasDetailsMain = ({ atlas }: any) => {
  const { address }: TParams = useParams();

  return (
    <div className="atlas_details_main">
      <div className="atlas_details_main_nd">
        <h1>ND Atlas</h1>
        <div className="atlas_details_main_online">
          {atlas?.state || 'WAIT'}
        </div>
      </div>
      <div className="atlas_details_main_address">
        <div className="atlas_details_main_cell universall_bold">Address</div>
        <div style={{ display: 'flex', gap: 16 }}>
          <div className="address_content">{address}</div>
          <CopyBtn />
        </div>
      </div>
    </div>
  );
};

export default AtlasDetailsMain;
