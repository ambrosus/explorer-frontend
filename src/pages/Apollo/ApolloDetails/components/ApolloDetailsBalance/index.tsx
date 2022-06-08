const ApolloDetailsBalance = () => {
  return (
    <div className="apollo_details_balance">
      <div className="apollo_details_balance_cells">
        <div className="apollo_details_balance_fonts_normal universall_light1">
          BALANCE
        </div>
        <div className="apollo_details_balance_cell">
          <span className="apollo_details_balance_fonts_bold">
            173,586.35 AMB
          </span>
          <span className=""> / $ 21,067.61184460</span>
        </div>
      </div>
      <div className="apollo_details_balance_cells">
        <div className="apollo_details_balance_fonts_normal universall_light1">
          UPTIME
        </div>
        <div className="apollo_details_balance_online">3 years</div>
      </div>
      <div className="apollo_details_balance_cells">
        <div className="apollo_details_balance_fonts_normal universall_light1">
          STAKE
        </div>
        <div className="apollo_details_balance_cell">
          <span className="apollo_details_balance_fonts_bold">
            600,000.00 AMB
          </span>
          <span className=""> / $ 5,067</span>
        </div>
      </div>
      <div className="apollo_details_balance_cells">
        <div className="apollo_details_balance_fonts_normal universall_light1">
          SOFTWARE
        </div>
        <div className="apollo_details_balance_fonts_bold">Apollo v2.7.2</div>
      </div>
    </div>
  );
};

export default ApolloDetailsBalance;
