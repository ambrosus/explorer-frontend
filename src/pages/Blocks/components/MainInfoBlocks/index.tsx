import { Number } from 'components/Number';
import { useTypedSelector } from 'hooks/useTypedSelector';

const MainInfoBlocks = () => {
  const { data: appData } = useTypedSelector((state: any) => state.app);
  const total = appData?.netInfo?.lastBlock?.number || 0;
  const avgBlockTime = appData?.netInfo?.avgBlockTime || 0;
  const avgBlockSize = appData?.netInfo?.avgBlockSize || 0;
  const avgBlockGasUsed = appData?.netInfo?.avgBlockGasUsed || 0;
  const avgNectarPerc = `(${(
    (appData?.netInfo?.avgBlockGasUsed / appData?.netInfo?.avgBlockGasLimit || 0) * 100
  ).toFixed(2)}%)` || 0;

  return (
    <div className="main_info_atlas">
      <h1 className="main_info_atlas_heading">Blocks</h1>
      <div className="main_info_atlas_table">
        <div className="main_info_atlas_cell">
          <span className="main_info_atlas_cell_primary">TOTAL BLOCKS</span>
          <span className="main_info_atlas_cell_secondary">
                        <Number value={total || 0} fixed={0} />
          </span>
        </div>
        <div className="main_info_atlas_cell">
          <span className="main_info_atlas_cell_primary">
          AVG. BLOCK SIZE
          </span>
          <span className="main_info_atlas_cell_secondary">
            {' '}
            <Number value={avgBlockSize || 0} fixed={1} /> Bytes
          </span>
        </div>
        <div className="main_info_atlas_cell">
          <span className="main_info_atlas_cell_primary">
            AVG. BLOCK TIME
          </span>
          <span className="main_info_atlas_cell_secondary">
            {' '}
            <Number value={avgBlockTime || 0} fixed={1} /> Sec
          </span>
        </div>
        <div className="main_info_atlas_cell">
          <span className="main_info_atlas_cell_primary">
           AVG. NECTAR USED
          </span>
          <span className="main_info_atlas_cell_secondary">
            {' '}
            <Number value={avgBlockGasUsed || 0} fixed={1} /> {avgNectarPerc}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MainInfoBlocks;
