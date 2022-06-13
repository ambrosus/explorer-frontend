import {Currency} from 'components/UI/Currency';
import {statusMessage} from 'utils/helpers';
import {useNavigate} from "react-router-dom";

const AtlasBlocksBody = ({lastCardRef, index, item}: any) => {
  const {totalBundles, address, stake, balance} = item;

  function redirectHandler() {
    navigate(`${item.address}`, {replace: true})
  }

  const navigate = useNavigate();


  return (
    <div className="atlas_blocks_body" ref={lastCardRef}>
      <div className="atlas_blocks_body_cell">{index}</div>
      <div
        style={{
          cursor: 'pointer'
        }}
        className="atlas_blocks_body_cell"
        onClick={redirectHandler}>{address}</div>
      <div className="atlas_blocks_body_cell">
        {' '}
        {statusMessage(item, 'Atlas')}
      </div>
      <div className="atlas_blocks_body_cell">
        <span className="atlas_blocks_body_cell_value">{totalBundles}</span>
      </div>
      <div className="atlas_blocks_body_cell">
        <Currency
          value={balance ? `${balance.ether}` : '0'}
          symbol="AMB"
          fixed={2}
        />
      </div>
      <div className="atlas_blocks_body_cell">
        <Currency
          value={stake ? `${stake.ether}` : '0'}
          symbol="AMB"
          fixed={2}
        />
      </div>
    </div>
  );
};

export default AtlasBlocksBody;
