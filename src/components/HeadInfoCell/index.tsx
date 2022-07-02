const HeadInfoCell = (props: any) => {
  const { title, value, className } = props;
  return (
    <div className="bundle_tabs_cells">
      <div className="bundle_tabs_cells_primary">{title}</div>
      <div className="bundle_tabs_cells_secondary">{value}</div>
    </div>
  );
};

export default HeadInfoCell;
