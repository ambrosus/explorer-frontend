import { ApolloBodyProps } from 'pages/Apollo/apollo.interface';
import { FC } from 'react';

const ApolloBlocksBody: FC<ApolloBodyProps> = ({ index, item }) => {
  return (
    <div className="apollo_blocks_body">
      <div className="apollo_blocks_body_cell">{index}</div>
      <div className="apollo_blocks_body_cell">
        {item.address}
      </div>
      {statusMessage(item, 'Apollo')}
      {isOnline ? (
        <div className="apollo_blocks_body_cell">
          <span className="apollo_blocks_body_cell_online">Uptime </span>16
          Minutes ago
        </div>
      ) : (
        <div className="apollo_blocks_body_cell apollo_blocks_body_cell_offline">
          Offline
        </div>
      )}
      <div className="apollo_blocks_body_cell">{item.totalBlocks}</div>
      <div className="apollo_blocks_body_cell">
        <span
          className="apollo_blocks_body_cell_token"
          style={{
            color: '#808a9d',
            textDecoration: 'underline solid #808a9d',
          }}
        >
          AMB
        </span>
        <span className="apollo_blocks_body_cell_value">{item.balance.ether.toFixed(5)}</span>
      </div>
      <div className="apollo_blocks_body_cell">
        <Currency
          value={item ? `${item.stake.ether}` : '0'}
          symbol="AMB"
          fixed={2}
        />
        <span className="apollo_blocks_body_cell_value">1,000,000.00</span>
        <span className="apollo_blocks_body_cell_token">AMB</span>
      </div>
    </div>
  );
};

export default ApolloBlocksBody;
