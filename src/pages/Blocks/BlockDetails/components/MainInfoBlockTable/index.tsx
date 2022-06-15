import React from 'react';

export const MainInfoBlockTable = ({block}: any) => {
  const {parentHash, hash, stateRoot, extraData} = block !== null && block
  return (
    <div className="main_info_atlas">
      <div className="main_info_atlas_table">
        <div className="main_info_atlas_cell">
          <span className="main_info_atlas_cell_primary">HASH</span>
          <span className="main_info_atlas_cell_secondary">{parentHash ?? ''}</span>
        </div>
        <div className="main_info_atlas_cell">
          <span className="main_info_atlas_cell_primary">PARENT HASH</span>
          <span className="main_info_atlas_cell_secondary"> {hash ?? ''}</span>
        </div>
        <div className="main_info_atlas_cell">
          <span className="main_info_atlas_cell_primary">STATE ROOT HASH</span>
          <span className="main_info_atlas_cell_secondary"> {stateRoot ?? ''}</span>
        </div>
        <div className="main_info_atlas_cell">
          <span className="main_info_atlas_cell_primary">DATA</span>
          <span className="main_info_atlas_cell_secondary"> {extraData ?? ''}</span>
        </div>
        {/*<div className="main_info_atlas_cell">Chart cell</div>*/}
      </div>
    </div>
  );
};

