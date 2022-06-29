const BundleMainCells = ({ primaryCell, secondaryCell }: any) => {
  return (
    <div className="bundle_tabs_cells">
      <div className="bundle_tabs_cells_primary">{primaryCell}</div>
      <div className="bundle_tabs_cells_secondary">{secondaryCell}</div>
    </div>
  );
};

export default BundleMainCells;
