import Amb from '../../../../../assets/icons/Cryptos/Amb';
import {Number} from 'components/Number';
import moment from 'moment';
import React from 'react';
import {sliceData5} from 'utils/helpers';
import {NavLink} from 'react-router-dom';

const BlockBody = ({lastCardRef, item}: any) => {
  const {type, blockHash, from, to, timestamp, value} = item;
  const amount = value?.ether || 0;
  return (
    <div className="block_body" ref={lastCardRef}>
      <div className="block_body_cell color-gray">{sliceData5(blockHash)}</div>
      <div className="block_body_cell">{type}</div>
      <div className="block_body_cell color-gray">
        <NavLink className="universall_light2" to={`/addresses/${from}`}>
          {sliceData5(from)}
        </NavLink>
      </div>
      <div className="block_body_cell color-gray">
        <NavLink className="universall_light2" to={`/addresses/${from}`}>
          {sliceData5(to)}
        </NavLink>
      </div>
      <div className="block_body_cell">
        {moment(timestamp * 1000).fromNow()}
      </div>
      <div className="block_body_cell">
        <span className="block_body_cell_icon">
          <Amb/> <span className="color-gray">AMB</span>
        </span>
        <Number value={amount} fixed={8}/>
      </div>
    </div>
  );
};

export default BlockBody;
