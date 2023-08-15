import Amb from '../../../../../assets/icons/Cryptos/Amb';
import { Number } from 'components/Number';
import moment from 'moment';
import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { getTokenIcon, sliceData5 } from 'utils/helpers';

const BlockBody = ({ lastCardRef, item }: any) => {
  const { type, hash, from, to, timestamp, value } = item;

  const amount = value?.ether || 0;

  const Icon = getTokenIcon(
    item.token?.symbol as string,
    item.token?.name,
    item.token?.address,
  );

  const _symbol = useMemo(() => {
    if (item.token?.address === '0x322269e52800e5094c008f3b01A3FD97BB3C8f5D') {
      return 'HPT';
    } else if (
      item.token?.address === '0x7240d2444151d9A8c72F77306Fa10f19FE7C9182'
    ) {
      return 'TPT';
    } else return item.token?.symbol;
  }, [item]);

  return (
    <div className="block_body" ref={lastCardRef}>
      <div className="block_body_cell color-gray">
        <NavLink
          className="universall_light2"
          rel="nofollow"
          to={`/tx/${hash}/`}
        >
          {sliceData5(hash)}
        </NavLink>
      </div>
      <div className="block_body_cell">{type.split(':')[0]}</div>
      <div className="block_body_cell color-gray">
        <NavLink
          rel="nofollow"
          className="universall_light2"
          to={`/address/${from}/`}
        >
          {sliceData5(from)}
        </NavLink>
      </div>
      <div className="block_body_cell color-gray">
        <NavLink
          rel="nofollow"
          className="universall_light2"
          to={`/address/${to}/`}
        >
          {sliceData5(to)}
        </NavLink>
      </div>
      <div className="block_body_cell">
        {moment(timestamp * 1000).fromNow()}
      </div>
      <div className="block_body_cell">
        <span className="block_body_cell_icon">
          <Icon />{' '}
          <span
            className="color-gray"
            style={{
              fontWeight: 600,
            }}
          >
            {_symbol || 'AMB'}
          </span>
        </span>
        <Number value={amount} fixed={6} />
      </div>
    </div>
  );
};

export default BlockBody;
