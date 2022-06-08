const ApolloDetailsBalance = () => {
  return (
    <div className="apollo_details_balance">
      <div className="apollo_details_balance_cells">
        <div className="apollo_details_balance_cell">BALANCE</div>
        <div className="apollo_details_balance_cell">
          <span className="">173,586.35 AMB</span>
          <span className=""> / $ 21,067.61184460</span>
        </div>
      </div>
      <div className="apollo_details_balance_cells">
        <div className="apollo_details_balance_cell">UPTIME</div>
        <div className="apollo_details_balance_cell">3 years</div>
      </div>
      <div className="apollo_details_balance_cells">
        <div className="apollo_details_balance_cell">STAKE</div>
        <div className="apollo_details_balance_cell">
          <span className="">600,000.00 AMB</span>
          <span className=""> / $ 5,067</span>
        </div>
      </div>
      <div className="apollo_details_balance_cells">
        <div className="apollo_details_balance_cell">SOFTWARE</div>
        <div className="apollo_details_balance_cell">Apollo v2.7.2</div>
      </div>
    </div>
  );
};

export default ApolloDetailsBalance;
