import { Currency } from '../../../../components/UI/Currency';
import Amb from 'assets/icons/Cryptos/Amb';
import { ApolloBodyProps } from 'pages/Apollo/apollo.interface';
import { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { statusMessage } from 'utils/helpers';

const ApolloBlocksBody: FC<ApolloBodyProps> = ({ index, item }) => {
  return (
    item &&
    (item.isRetired ? (
      <tr className="apollo_blocks_body apollo_blocks_body_retired">
        <td>
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
        </td>
        <td>
          <div className="apollo_blocks_body_cell apollo_blocks_body_cell_yellow">
            Blocked
          </div>
        </td>
        <td>
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
        </td>
        <td>
          <div className="apollo_blocks_body_cell">{item.unlockTime}</div>
        </td>
      </tr>
    ) : (
      <tr className="apollo_blocks_body">
        <td>
          <div className="apollo_blocks_body_cell">{index}</div>
        </td>
        <td>
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
        </td>
        <td>
          <div className="apollo_blocks_body_cell">
            {statusMessage(item, 'Apollo')}
          </div>
        </td>
        <td>
          <div className="apollo_blocks_body_cell">{item.totalBlocks}</div>
        </td>
        <td>
          <div className="apollo_blocks_body_cell">
            <span className="address_blocks_cell_icon">
              <Amb />
            </span>
            <span className="apollo_blocks_body_cell_token">AMB</span>
            <span className="apollo_blocks_body_cell_value">
              <Currency
                value={item ? `${item.balance?.ether}` : '0'}
                symbol=" "
                fixed={6}
              />
            </span>
          </div>
        </td>
        <td>
          <div className="apollo_blocks_body_cell">
            <Currency
              value={item ? `${item.stake.ether}` : '0'}
              symbol="AMB"
              fixed={6}
            />
          </div>
        </td>
      </tr>
    ))
  );
};

export default memo(ApolloBlocksBody);
