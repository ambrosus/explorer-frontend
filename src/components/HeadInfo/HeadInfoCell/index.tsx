const HeadInfoCell = ({ primaryCell, secondaryCell }: any) => {
  return (
    <div className="head_info_cells">
      <div className="head_info_cells_primary">{primaryCell}</div>
      <div className="head_info_cells_secondary">{secondaryCell}</div>
    </div>
  );
};

export default HeadInfoCell;
