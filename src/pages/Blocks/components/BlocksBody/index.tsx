import { useNavigate } from 'react-router-dom';
import {sliceData5} from 'utils/helpers';
import moment from "moment";

const BlocksBody = ({ lastCardRef, item }: any) => {
  const {number,
    miner,
    hash,
    totalTransactions,
    timestamp,
    size } = item;

  function redirectHandler() {
    navigate(`${item.number}`);
  }

  const navigate = useNavigate();

  return (
    <div className="atlas_blocks_body" ref={lastCardRef}>
      <div className="atlas_blocks_body_cell"
           style={{
             cursor: 'pointer',
           }}
           onClick={redirectHandler}
      >
        {number}
      </div>
      <div
        className="atlas_blocks_body_cell"
      >
        {miner}
      </div>
      <div className="atlas_blocks_body_cell">
        {sliceData5(hash)}
      </div>
      <div className="atlas_blocks_body_cell">
        {totalTransactions}
      </div>
      <div className="atlas_blocks_body_cell">
        {moment(timestamp * 1000).fromNow()}
      </div>
      <div className="atlas_blocks_body_cell">
        {size} bytes
      </div>
    </div>
  );
};

export default BlocksBody;
