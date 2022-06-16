import { Currency } from '../../../../components/UI/Currency';
import Amb from 'assets/icons/Cryptos/Amb';
import { ApolloBodyProps } from 'pages/Apollo/apollo.interface';
import { FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { statusMessage } from 'utils/helpers';

const ApolloBlocksBody: FC<ApolloBodyProps> = ({
  lastCardRef,
  index,
  item,
}) => {
  // const navigate = useNavigate();

  // function redirectHandler() {
  //   navigate(`${item.address}`);
  // }

  return (
    item && (
      <div className="apollo_blocks_body" ref={lastCardRef}>
        <div className="apollo_blocks_body_cell">{index}</div>

        <NavLink
          style={{
            cursor: 'pointer',
            color: '#808A9D',
            textDecoration: 'none',
          }}
          className="apollo_blocks_body_cell"
          // onClick={redirectHandler}

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
            {item.balance.ether.toFixed(5)}
          </span>
        </div>
        <div className="apollo_blocks_body_cell">
          <Currency
            value={item ? `${item.stake.ether}` : '0'}
            symbol="AMB"
            fixed={2}
          />
        </div>
      </div>
    )
  );
};

export default ApolloBlocksBody;
