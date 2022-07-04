import React, { FC } from 'react';

const HeadingInfo = ({ block = { miner: '',number:0 } }: any) => (
    <div className="block_main_title">
      <div className="block_main_title__in">
        <h1 className="block_main_title_heading">Block details</h1>
        <span className="block_main_title_heading_block">{block?.number}</span>
      </div>
      <div className="block_main_title__in">
        <div className="block_main_title_validator">Validator </div>
        <span className="block_main_title_address">{block?.miner ?? ''}</span>
      </div>
    </div>
  );

export default HeadingInfo;
