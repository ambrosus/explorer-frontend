const AtlasDetailsBalance = () => {
  return (
    <div className="atlas_details_balance">
      <div className="atlas_details_balance_cells">
        <div className="atlas_details_balance_fonts_normal universall_light1">
          BALANCE
        </div>
        <div className="atlas_details_balance_cell">
          <span className="atlas_details_balance_fonts_bold">
            173,586.35 AMB
          </span>
          <span className=""> / $ 21,067.61184460</span>
        </div>
      </div>
      <div className="atlas_details_balance_cells">
        <div className="atlas_details_balance_fonts_normal universall_light1">
          STAKE
        </div>
        <div className="atlas_details_balance_cell">
          <span className="atlas_details_balance_fonts_bold">
            600,000.00 AMB
          </span>
          <span className=""> / $ 5,067</span>
        </div>
      </div>
      <div className="atlas_details_balance_cells">
        <div className="atlas_details_balance_fonts_normal universall_light1">
          SOFTWARE
        </div>
        <div className="atlas_details_balance_fonts_bold">Apollo v2.7.2</div>
      </div>
    </div>
  );
};

export default AtlasDetailsBalance;
