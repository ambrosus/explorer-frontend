const HeadInfoCell = ({
  primaryCell,
  secondaryCell,
  stylePrimaryCell,
  styleSecondaryCell,
}: any) => {
  return (
    <div className="head_info_cells">
      <div className="head_info_cells_primary">{primaryCell}</div>
      <div className="head_info_cells_secondary" style={styleSecondaryCell}>
        {secondaryCell}
      </div>
    </div>
  );
};

export default HeadInfoCell;
