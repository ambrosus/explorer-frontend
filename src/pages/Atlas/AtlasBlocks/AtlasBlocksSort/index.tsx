import { PBlocksSort, TAddressesSortProps } from '../tableBlocks.interface';
import { FC } from 'react';

const BlocksSort: FC<PBlocksSort> = ({ sortTerm, setSortTerm }) => (
  <div className="blocks_sort">
    <div className="blocks_sort_heading">Addresses</div>
    <div className="blocks_sort_cells">
      <div className="blocks_sort_cell">Sort by</div>
      {sortOptions.map((option, index) => (
        <div
          key={index}
          className={`blocks_sort_cell pointer ${
            option.value === sortTerm && 'blocks_sort_active'
          }`}
          onClick={() => {
            setSortTerm(option.value);
          }}
        >
          {option.label}
        </div>
      ))}
    </div>
  </div>
);

export default BlocksSort;

const sortOptions: TAddressesSortProps[] = [
  {
    label: 'Address',
    value: 'address',
  },
  {
    label: 'Balance',
    value: 'balance',
  },
  {
    label: 'Total Tx',
    value: 'totalTx',
  },
];
