const HeadInfoCell = ({
  primaryCell,
  secondaryCell,
  calendarBtn,
  style,
  styleCell,
}: any) => {
  return (
    <div className="head_info_cells" style={styleCell}>
      <div>
        <div className="head_info_cells_primary">{primaryCell}</div>
        <div className="head_info_cells_secondary" style={style}>
          {secondaryCell}
        </div>
      </div>
      {calendarBtn}
    </div>
  );
};

export default HeadInfoCell;
