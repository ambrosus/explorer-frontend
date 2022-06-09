import { Currency } from 'components/UI/Currency';
import { statusMessage } from 'utils/helpers';

const AtlasBlocksBody = ({ lastCardRef, index, item }: any) => {
  const { totalBundles, address, stake, balance } = item;
  return (
    <div className="atlas_blocks_body" ref={lastCardRef}>
      <div className="atlas_blocks_body_cell">{index}</div>
      <div className="atlas_blocks_body_cell">{address}</div>
      <div className="atlas_blocks_body_cell">
        {' '}
        {statusMessage(item, 'Atlas')}
      </div>
      <div className="atlas_blocks_body_cell">
        <span
          className="atlas_blocks_body_cell_token"
          style={{
            color: '#808a9d',
            textDecoration: 'underline solid #808a9d',
          }}
        >
          AMB
        </span>
        <span className="atlas_blocks_body_cell_value">{totalBundles}</span>
      </div>
      <div className="atlas_blocks_body_cell">
        <Currency
          value={stake ? `${balance.ether}` : '0'}
          symbol="AMB"
          fixed={2}
        />
      </div>
    </div>
  );
};

export default AtlasBlocksBody;
