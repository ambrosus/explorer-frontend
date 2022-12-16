import Amb from 'assets/icons/Cryptos/Amb';
import { Currency } from 'components/UI/Currency';
import { NavLink } from 'react-router-dom';
import { statusMessage } from 'utils/helpers';

const AtlasBlocksBody = ({ index, item }: any) => {
  const { totalBundles, address, stake, balance } = item;

  return (
    <div className="atlas_blocks_body">
      <div className="atlas_blocks_body_cell">{index}</div>
      <NavLink
        style={{
          cursor: 'pointer',
          color: '#808A9D',
          fontWeight: 600,
        }}
        rel="nofollow"
        className="atlas_blocks_body_cell"
        to={`${item.address}/`}
      >
        {address}
      </NavLink>
      <div className="atlas_blocks_body_cell">
        {' '}
        {statusMessage(item, 'Atlas')}
      </div>
      <div className="atlas_blocks_body_cell">
        <span className="atlas_blocks_body_cell_value">{totalBundles}</span>
      </div>

      <div className="atlas_blocks_body_cell">
        <span className="atlas_blocks_body_cell_amb">
          <Amb />
        </span>
        <Currency
          value={balance ? `${balance.ether}` : '0'}
          symbol="AMB"
          fixed={8}
          side="left"
        />
      </div>
      <div className="atlas_blocks_body_cell">
        <Currency
          value={stake ? `${stake.ether}` : '0'}
          symbol="AMB"
          fixed={8}
        />
      </div>
    </div>
  );
};

export default AtlasBlocksBody;
