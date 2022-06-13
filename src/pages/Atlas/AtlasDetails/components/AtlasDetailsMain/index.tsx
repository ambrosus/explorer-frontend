import ContentCopy from 'assets/icons/CopyIcons/ContentCopy';
import {TParams} from "../../../../../types";
import {useParams} from "react-router-dom";
import useCopyContent from "../../../../../hooks/useCopyContent";
import ContentCopyed from "../../../../../assets/icons/CopyIcons/ContentCopyed";
import CopyPopUp from "../../../../../assets/icons/CopyIcons/CopyPopUp";
import React from "react";

const AtlasDetailsMain = () => {
  const {address}: TParams = useParams();

  const {isCopy, copyContent, isCopyPopup} = useCopyContent(address);

  return (
    <div className="atlas_details_main">
      <div className="atlas_details_main_nd">
        <h1>ND Atlas</h1>
        <div className="atlas_details_main_online">ONBOARDED</div>
      </div>
      <div className="atlas_details_main_address">
        <div className="atlas_details_main_cell universall_bold">Address</div>
        <div className="atlas_details_main_cell">
          {address}
        </div>
        <button
          className="atlas_details_main_cell"
          onClick={copyContent}>
          {isCopy ? (
            <>
              <ContentCopyed/>
            </>
          ) : (
            <ContentCopy/>
          )}
          {isCopyPopup && isCopy && (
            <div className="address_details_copyed">
              <CopyPopUp x={3} y={20} values="Copyed"/>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default AtlasDetailsMain;
