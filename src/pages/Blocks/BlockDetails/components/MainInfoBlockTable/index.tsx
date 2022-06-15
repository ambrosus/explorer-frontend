import { useTypedSelector } from 'hooks/useTypedSelector';
import React from 'react';

const MainInfoBlockTable = () => {
  const { data: appData } = useTypedSelector((state: any) => state.app);

  return (
    <div className="main_info_atlas">
      <div className="main_info_atlas_table">
        <div className="main_info_atlas_cell">
          <span className="main_info_atlas_cell_primary">HASH</span>
          <span className="main_info_atlas_cell_secondary">total</span>
        </div>
        <div className="main_info_atlas_cell">
          <span className="main_info_atlas_cell_primary">PARENT HASH</span>
          <span className="main_info_atlas_cell_secondary"> dsadas</span>
        </div>
        <div className="main_info_atlas_cell">
          <span className="main_info_atlas_cell_primary">STATE ROOT HASH</span>
          <span className="main_info_atlas_cell_secondary"> dsadas</span>
        </div>
        <div className="main_info_atlas_cell">
          <span className="main_info_atlas_cell_primary">DATA</span>
          <span className="main_info_atlas_cell_secondary"> dsadas</span>
        </div>
        {/*<div className="main_info_atlas_cell">Chart cell</div>*/}
      </div>
    </div>
  );
};

export default MainInfoBlockTable;