import React from 'react';
import {NavLink} from "react-router-dom";

export const MainInfoBlockTable = ({block}: any) => {
  const {parentHash, hash, stateRoot, extraData} =
  block !== null && block !== undefined && block;
  return (
    <div className="main_info_block_table form-row">
      <div className="main_info_block_table_table">
        <div className="main_info_block_table_cell">
          <span className="main_info_block_table_cell_primary">HASH</span>
          <span className="main_info_block_table_cell_secondary gray">
            {hash ?? ''}

          </span>
        </div>
        <div className="main_info_block_table_cell">
          <span className="main_info_block_table_cell_primary">
            PARENT HASH
          </span>
          <span className="main_info_block_table_cell_secondary gray">
            {' '}
            <NavLink className="address_blocks_icon universall_light2" to={`/blocks/${parentHash}`}>
                          {parentHash ?? ''}
            </NavLink>
          </span>
        </div>
        <div className="main_info_block_table_cell">
          <span className="main_info_block_table_cell_primary">
            STATE ROOT HASH
          </span>
          <span className="main_info_block_table_cell_secondary">
            {' '}
            {stateRoot ?? ''}
          </span>
        </div>
        <div className="main_info_block_table_cell">
          <span className="main_info_block_table_cell_primary">DATA</span>
          <span className="main_info_block_table_cell_secondary">
            {' '}
            {extraData ?? ''}
          </span>
        </div>
      </div>
    </div>
  );
};
