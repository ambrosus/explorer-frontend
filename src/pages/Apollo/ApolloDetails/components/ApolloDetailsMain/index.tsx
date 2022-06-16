import ContentCopyed from '../../../../../assets/icons/CopyIcons/ContentCopyed';
import CopyPopUp from '../../../../../assets/icons/CopyIcons/CopyPopUp';
import useCopyContent from '../../../../../hooks/useCopyContent';
import { TParams } from '../../../../../types';
import ContentCopy from 'assets/icons/CopyIcons/ContentCopy';
import useDeviceSize from 'hooks/useDeviceSize';
import React from 'react';
import { useParams } from 'react-router-dom';

const AtlasDetailsBalance = ({ apollo }: any) => {
  const { address }: TParams = useParams();
  console.log(apollo);

  const { isCopy, copyContent, isCopyPopup } = useCopyContent(address);
  const isOffline = apollo?.status === 'OFFLINE' ? '#bfc9e0' : undefined;
  const { FOR_TABLET } = useDeviceSize();

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
          <button className="address_button" onClick={copyContent}>
            {isCopy ? <ContentCopyed /> : <ContentCopy />}

            {FOR_TABLET && isCopyPopup && isCopy && (
              <div className="address_button_copyed">
                <CopyPopUp x={3} y={20} values="Copyed" />
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AtlasDetailsBalance;
