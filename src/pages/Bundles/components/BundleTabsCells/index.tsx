const BundleMainCells = ({ primaryCell, secondaryCell }: any) => {
  return (
    <tr className="bundle_tabs_cells">
      <td className="bundle_tabs_cells_primary">{primaryCell}</td>
      <td className="bundle_tabs_cells_secondary">{secondaryCell}</td>
    </tr>
  );
};

export default BundleMainCells;
