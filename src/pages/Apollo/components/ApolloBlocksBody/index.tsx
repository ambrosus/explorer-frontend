import { ApolloBodyProps } from 'pages/Apollo/apollo.interface';
import { FC } from 'react';

const ApolloBlocksBody: FC<ApolloBodyProps> = ({ isOnline }) => {
  return (
    <div className="apollo_blocks_body">
      <div className="apollo_blocks_body_cell">1</div>
      <div className="apollo_blocks_body_cell">
        0xF977814e90dA44bFA03b6295A0616a897441aceC
      </div>
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
      <div className="apollo_blocks_body_cell">12.234</div>
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
        <span className="apollo_blocks_body_cell_value">1.33345</span>
      </div>
      <div className="apollo_blocks_body_cell">
        <span className="apollo_blocks_body_cell_value">1,000,000.00</span>
        <span className="apollo_blocks_body_cell_token">AMB</span>
      </div>
    </div>
  );
};

export default ApolloBlocksBody;
