const HeadInfoCell = ({
  primaryCell,
  secondaryCell,
  calendarBtn,
  style,
  styleCell,
}: any) => {
  return (
<<<<<<< HEAD
    <div className="head_info_cells" style={styleCell}>
      <div>
        <div className="head_info_cells_primary">{primaryCell}</div>
        <div className="head_info_cells_secondary" style={style}>
          {secondaryCell}
=======
    <>
      <div className="head_info_cells">
        <div style={{ width: 'inherit' }}>
          <div className="head_info_cells_primary">{primaryCell}</div>
          <div className="head_info_cells_secondary" style={style}>
            {secondaryCell}
          </div>
>>>>>>> main
        </div>
      </div>
      {calendarBtn}
    </div>
  );
};

export default HeadInfoCell;
