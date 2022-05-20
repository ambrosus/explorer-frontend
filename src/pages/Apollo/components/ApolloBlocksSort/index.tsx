import { PApolloSort, TApolloSortProps } from '../../apolloBlocks.interface';
import { FC } from 'react';

const apolloSort: FC<PApolloSort> = ({ sortTerm, setSortTerm }) => (
  <div className="apollo_blocks_sort">
    <div className="apollo_blocks_sort_heading">Nodes</div>
    <div className="apollo_blocks_sort_cells">
      <div className="apollo_blocks_sort_cell">Sort by</div>
      {sortOptions.map((option, index) => (
        <div
          key={index}
          className={`apollo_blocks_sort_cell pointer ${
            option.value === sortTerm && 'apollo_blocks_sort_active'
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

export default apolloSort;

const sortOptions: TApolloSortProps[] = [
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
