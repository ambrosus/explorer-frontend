const BlockSort = ({ label, sortTerm, setSortTerm, sortOptions }: any) => (
  <div className="atlas_blocks_sort">
    <div className="atlas_blocks_sort_heading">{label}</div>
    {sortOptions && (
      <div className="atlas_blocks_sort_cells">
        <div className="atlas_blocks_sort_cell">Sort by</div>
        {sortOptions.map((option: any, index: number) => (
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

export default BlockSort;
