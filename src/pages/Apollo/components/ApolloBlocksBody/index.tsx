import { Currency } from '../../../../components/UI/Currency';
import { statusMessage } from '../../utils';

const ApolloBlocksBody = ({ index, item }: any) => (
  <div className="apollo_blocks_body">
    <div className="apollo_blocks_body_cell">{index}</div>
    <div className="apollo_blocks_body_cell">{item.address}</div>
    <div className="apollo_blocks_body_cell">
      {statusMessage(item, 'Apollo')}
    </div>
    <div className="apollo_blocks_body_cell">{item.totalBlocks}</div>
    <div className="apollo_blocks_body_cell">
      <span>{item.balance.ether.toFixed(5)}</span>
      <span>AMB</span>
    </div>
    <div className="apollo_blocks_body_cell">
      <Currency
        value={item ? `${item.stake.ether}` : '0'}
        symbol="AMB"
        fixed={2}
      />
    </div>
  </div>
);

export default ApolloBlocksBody;
