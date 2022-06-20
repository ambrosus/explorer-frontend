import React, { FC } from 'react';

const HeadingInfo = ({ address = '', block = { miner: '' } }: any) => (
  <div className="block_main_title">
    <div>
      <h1 className="block_main_title_heading">
        Blocks <span className="block_main_title_heading_block">{address}</span>
      </h1>
    </div>
    <div>
      <div className="block_main_title_validator">
        Validator{' '}
        <span className="block_main_title_validator_address">
          {block?.miner ?? ''}
        </span>
      </div>
    </div>
  </div>
);

export default HeadingInfo;
