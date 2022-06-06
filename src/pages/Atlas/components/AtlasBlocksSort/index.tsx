import { PAtlasSort, TAtlasSortProps } from '../../atlasBlocks.interface';
import { FC } from 'react';

const AtlasBlocksSort: FC<PAtlasSort> = ({ sortTerm, setSortTerm }) => (
  <div className="atlas_blocks_sort">
    <div className="atlas_blocks_sort_heading">Nodes</div>
    <div className="atlas_blocks_sort_cells">
      <div className="atlas_blocks_sort_cell">Sort by</div>
      {sortOptions.map((option, index) => (
        <div
          key={index}
          className={`atlas_blocks_sort_cell pointer ${
            option.value === sortTerm && 'atlas_blocks_sort_active'
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

export default AtlasBlocksSort;

const sortOptions: TAtlasSortProps[] = [
  {
    label: 'Address',
    value: 'address',
  },
  {
    label: 'Total bundles',
    value: 'totalBundles',
  },
  {
    label: 'Balance',
    value: 'balance',
  },
  {
    label: 'Stake',
    value: 'stake',
  },
];
