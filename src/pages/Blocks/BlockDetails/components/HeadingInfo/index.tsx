import { TParams } from '../../../../../types';
import { IBlock } from '../../index';
import React from 'react';
import { useParams } from 'react-router-dom';

interface HeadingInfoProps {
  block: IBlock | any;
}

const HeadingInfo = ({ block }: HeadingInfoProps) => {
  const { address }: TParams = useParams();

  return (
    <div className="block_main_title">
      <div className="block_main_title__in">
        <h1 className="block_main_title_heading">Block details</h1>
        <span className="block_main_title_heading_block">{address}</span>
      </div>
      <div className="block_main_title__in">
        <div className="block_main_title_validator">Validator</div>
        <span className="block_main_title_address">{block?.miner ?? ''}</span>
      </div>
    </div>
  );
};

export default HeadingInfo;
