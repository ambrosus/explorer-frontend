import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

const HeadingInfo = ({ block = { miner: '', number: 0 } }: any) => {
  const func = () => {
    return setTimeout(() => {
      return block?.miner ?? 0;
    }, 100);
  };

  return (
    <>
      <div className="block_main_title">
        <div className="block_main_title__in">
          <h1 className="block_main_title_heading">Block details</h1>
          <span className="block_main_title_heading_block">
            {block?.number ?? 0}
          </span>
        </div>
        <div className="block_main_title__in">
          <div className="block_main_title_validator">Validator </div>
          <NavLink
            to={`/apollo/${block?.miner}/`}
            className="block_main_title_address"
          >
            {block?.miner ?? ''}
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default HeadingInfo;
