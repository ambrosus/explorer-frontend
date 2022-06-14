import { apollosSorting } from '../../../../utils/sidePages';
import { PApolloSort } from '../../apolloBlocks.interface';
import { FC } from 'react';

const ApolloBlocksSort: FC<PApolloSort> = ({ sortTerm, setSortTerm }) => (
  <div className="apollo_blocks_sort">
    <div className="apollo_blocks_sort_heading">Nodes</div>
    <div className="apollo_blocks_sort_cells">
      <div className="apollo_blocks_sort_cell">Sort by</div>
      {apollosSorting.map((option, index) => (
        <div
          key={index}
          className={`apollo_blocks_sort_cell pointer ${
            option.value === sortTerm && 'apollo_blocks_sort_active'
          }`}
          onClick={() => {
            setSortTerm(option.value);
          }}
        >
          {option.label || option.title}
        </div>
      ))}
    </div>
  </div>
);

export default ApolloBlocksSort;
