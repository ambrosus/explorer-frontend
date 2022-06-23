import GreenCircle from 'assets/icons/StatusAction/GreenCircle';
import OrangeCircle from 'assets/icons/StatusAction/OrangeCircle';
import { LatestBlocksProps } from 'pages/Home/home.interfaces';
import React from 'react';
import { calckBlocks, calcTime, sliceData5 } from 'utils/helpers';

const LatestBlocks: React.FC<LatestBlocksProps> = ({
  number,
  index,
  timestamp,
  validator,
  totalTransactions,
  blockReward,
}) => {
  const online = index > 1 ? <GreenCircle /> : <OrangeCircle />;

  return (
    <>
      <div className="latest_blocks_cells">
        <div className="latest_blocks_cell">
          <div className="latest_blocks_cell_content latest_blocks_font_big">
            <span style={{ marginRight: 8 }}>{online}</span>
            {number}
          </div>

          <div className="latest_blocks_p latest_blocks_font_small">
            <span style={{ marginRight: 16 }}></span>
            {calcTime(timestamp as number)}
          </div>
        </div>

        <div className="latest_blocks_cell">
          <div className="latest_blocks_cell_content">
            <div className="latest_blocks_font_small" style={{ width: 54 }}>
              Validator
            </div>
            <div className="latest_blocks_font_big latest_blocks_margin-left">
              {sliceData5(validator as string)}
            </div>
          </div>
          <div className="latest_blocks_cell_content">
            <div
              className="latest_blocks_font_small"
              style={{ width: 54 }}
            ></div>
            <div
              className="latest_blocks_font_small"
              style={{
                marginLeft: '1px',
                color: '#05060F',
                fontWeight: 600,
              }}
            >{`${totalTransactions} txns`}</div>
          </div>
        </div>
        <div className="latest_blocks_cell">
          <div className="latest_blocks_cell_content latest_blocks_font_small">
            Block Reward
          </div>
          <div className="latest_blocks_cell_content latest_blocks_font_big">{`${calckBlocks(
            blockReward,
          )} AMB`}</div>
        </div>
      </div>
    </>
  );
};

export default LatestBlocks;
