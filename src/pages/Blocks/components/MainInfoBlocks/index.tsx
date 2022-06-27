import { Number } from 'components/Number';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { FC } from 'react';

const MainInfoBlocks: FC = () => {
  const { data: appData } = useTypedSelector((state: any) => state.app);
  const total: number = appData?.netInfo?.lastBlock?.number || 0;
  const avgBlockTime: number = appData?.netInfo?.avgBlockTime || 0;
  const avgBlockSize: number = appData?.netInfo?.avgBlockSize || 0;
  const avgBlockGasUsed: number = appData?.netInfo?.avgBlockGasUsed || 0;
  const avgNectarPerc: string | number =
    `(${(
      (appData?.netInfo?.avgBlockGasUsed / appData?.netInfo?.avgBlockGasLimit ||
        0) * 100
    ).toFixed(2)}%)` || 0;

  return (
    <div className="main_info_blocks_blocks">
      <div className="main_info_blocks_blocks_table">
        <div className="main_info_blocks_blocks_cell">
          <span className="main_info_blocks_blocks_cell_primary">
            TOTAL BLOCKS
          </span>
          <span className="main_info_blocks_blocks_cell_secondary">
            <Number value={total} fixed={0} />
          </span>
        </div>
        <div className="main_info_blocks_blocks_cell">
          <span className="main_info_blocks_blocks_cell_primary">
            AVG. BLOCK SIZE
          </span>
          <span className="main_info_blocks_blocks_cell_secondary">
            {' '}
            <Number value={avgBlockSize} fixed={1} /> Bytes
          </span>
        </div>
        <div className="main_info_blocks_blocks_cell">
          <span className="main_info_blocks_blocks_cell_primary">
            AVG. BLOCK TIME
          </span>
          <span className="main_info_blocks_blocks_cell_secondary">
            {' '}
            <Number value={avgBlockTime} fixed={1} /> Sec
          </span>
        </div>
        <div className="main_info_blocks_blocks_cell">
          <span className="main_info_blocks_blocks_cell_primary">
            AVG. NECTAR USED
          </span>
          <span className="main_info_blocks_blocks_cell_secondary">
            {' '}
            <Number value={avgBlockGasUsed} fixed={1} /> {avgNectarPerc}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MainInfoBlocks;
