import ContentCopy from 'assets/icons/CopyIcons/ContentCopy';
import ContentCopyed from 'assets/icons/CopyIcons/ContentCopyed';
import CopyPopUp from 'assets/icons/CopyIcons/CopyPopUp';
import useCopyContent from 'hooks/useCopyContent';
import useDeviceSize from 'hooks/useDeviceSize';
import React from 'react';
import { useParams } from 'react-router-dom';
import { TParams } from 'types';

const AtlasDetailsMain = ({ atlas }: any) => {
  const { address }: TParams = useParams();

  const { isCopy, copyContent, isCopyPopup } = useCopyContent(address);
  const { FOR_TABLET } = useDeviceSize();
  return (
    <div className="atlas_details_main">
      <div className="atlas_details_main_nd">
        <h1>ND Atlas</h1>
        <div className="atlas_details_main_online">{atlas?.state ?? ''}</div>
      </div>
      <div className="atlas_details_main_address">
        <div className="atlas_details_main_cell universall_bold">Address</div>
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

export default AtlasDetailsMain;
