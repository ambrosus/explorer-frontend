import { PAtlasSort } from '../../atlasBlocks.interface';
import { FC } from 'react';

const AtlasBlocksSort: FC<PAtlasSort> = ({
  label,
  sortTerm,
  setSortTerm,
  sortOptions,
}) => (
  <div className="atlas_blocks_sort">
    <div className="atlas_blocks_sort_heading">{label}</div>
    {sortOptions && (
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
            {option.label || option.title}
          </div>
        ))}
      </div>
    )}
  </div>
);

export default AtlasBlocksSort;
