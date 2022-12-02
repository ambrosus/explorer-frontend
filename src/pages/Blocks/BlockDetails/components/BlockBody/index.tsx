import Amb from '../../../../../assets/icons/Cryptos/Amb';
import { Number } from 'components/Number';
import moment from 'moment';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { sliceData5 } from 'utils/helpers';

const BlockBody = ({ lastCardRef, item }: any) => {
  const { type, hash, from, to, timestamp, value } = item;

  const amount = value?.ether || 0;
  return (
    <div className="block_body" ref={lastCardRef}>
      <div className="block_body_cell color-gray">
        <NavLink className="universall_light2" to={`/tx/${hash}/`}>
          {sliceData5(hash)}
        </NavLink>
      </div>
      <div className="block_body_cell">{type.split(':')[0]}</div>
      <div className="block_body_cell color-gray">
        <NavLink className="universall_light2" to={`/address/${from}/`}>
          {sliceData5(from)}
        </NavLink>
      </div>
      <div className="block_body_cell color-gray">
        <NavLink className="universall_light2" to={`/address/${to}/`}>
          {sliceData5(to)}
        </NavLink>
      </div>
      <div className="block_body_cell">
        {moment(timestamp * 1000).fromNow()}
      </div>
      <div className="block_body_cell">
        <span className="block_body_cell_icon">
          <Amb />{' '}
          <span
            className="color-gray"
            style={{
              fontWeight: 600,
            }}
          >
            AMB
          </span>
        </span>
        <Number value={amount} fixed={6} />
      </div>
    </div>
  );
};

export default BlockBody;
