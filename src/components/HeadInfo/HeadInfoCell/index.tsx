const HeadInfoCell = ({
  primaryCell,
  secondaryCell,
  calendarBtn,
  style,
}: any) => {
  return (
    <>
      <div className="head_info_cells">
        <div>
          <div className="head_info_cells_primary">{primaryCell}</div>
          <div className="head_info_cells_secondary" style={style}>
            {secondaryCell}
          </div>
        </div>
        {calendarBtn}
      </div>
    </>
  );
};

export default HeadInfoCell;
