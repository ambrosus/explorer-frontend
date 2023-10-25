import { Currency } from '../../../../components/UI/Currency';
import Amb from 'assets/icons/Cryptos/Amb';
import { ApolloBodyProps } from 'pages/Apollo/apollo.interface';
import { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { statusMessage } from 'utils/helpers';

const ApolloBlocksBody: FC<ApolloBodyProps> = ({ index, item }) => {
  return item && (
    item.isRetired ? (
      <div className="apollo_blocks_body apollo_blocks_body_retired">
        <NavLink
          style={{
            cursor: 'pointer',
            color: '#808A9D',
            fontWeight: 600,
          }}
          className="apollo_blocks_body_cell"
          to={`${item.address}/`}
        >
          {item.address}
        </NavLink>
        <div className="apollo_blocks_body_cell apollo_blocks_body_cell_yellow">Blocked</div>
        <div className="apollo_blocks_body_cell">
          <span className="address_blocks_cell_icon">
            <Amb />
          </span>
          <span className="apollo_blocks_body_cell_token">AMB</span>
          <span className="apollo_blocks_body_cell_value">
          <Currency
            value={item ? `${item.amount}` : '0'}
            symbol=" "
            fixed={8}
          />
        </span>
        </div>
        <div className="apollo_blocks_body_cell">{item.unlockTime}</div>
      </div>
    ) : (
      <div className="apollo_blocks_body">
        <div className="apollo_blocks_body_cell">{index}</div>

        <NavLink
          style={{
            cursor: 'pointer',
            color: '#808A9D',
            fontWeight: 600,
          }}
          className="apollo_blocks_body_cell"
          to={`${item.address}/`}
        >
          {item.address}
        </NavLink>
        <div className="apollo_blocks_body_cell">
          {statusMessage(item, 'Apollo')}
        </div>
        <div className="apollo_blocks_body_cell">{item.totalBlocks}</div>
        <div className="apollo_blocks_body_cell">
        <span className="address_blocks_cell_icon">
          <Amb />
        </span>
          <span className="apollo_blocks_body_cell_token">AMB</span>
          <span className="apollo_blocks_body_cell_value">
          <Currency
            value={item ? `${item.balance?.ether}` : '0'}
            symbol=" "
            fixed={8}
          />
        </span>
        </div>
        <div className="apollo_blocks_body_cell">
          <Currency
            value={item ? `${item.stake.ether}` : '0'}
            symbol="AMB"
            fixed={6}
          />
        </div>
      </div>
    )
  );
};

export default memo(ApolloBlocksBody);
