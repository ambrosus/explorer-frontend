import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { sliceData5 } from 'utils/helpers';

const BlocksBody = ({ lastCardRef, item }: any) => {
  const { number, miner, hash, totalTransactions, timestamp, size } = item;

  function redirectHandler() {
    navigate(`${item.number}`);
  }

  const navigate = useNavigate();

  return (
    <div className="blocks_blocks_body" ref={lastCardRef}>
      <div
        className="blocks_blocks_body_cell"
        style={{
          cursor: 'pointer',
        }}
        onClick={redirectHandler}
      >
        {number}
      </div>
      <div className="blocks_blocks_body_cell">{miner}</div>
      <div className="blocks_blocks_body_cell">{sliceData5(hash)}</div>
      <div className="blocks_blocks_body_cell">{totalTransactions}</div>
      <div className="blocks_blocks_body_cell">
        {moment(timestamp * 1000).fromNow()}
      </div>
      <div className="blocks_blocks_body_cell">{size} bytes</div>
    </div>
  );
};

export default BlocksBody;
