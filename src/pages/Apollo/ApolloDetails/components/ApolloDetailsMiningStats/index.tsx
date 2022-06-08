import CalendarIcon from 'assets/icons/CalendarIcon';

const ApolloDetailsMiningStats = () => {
  return (
    <div className="apollo_details_mining_stats">
      <div className="apollo_details_mining_stats_cells">
        <div className="apollo_details_mining_stats_cell">
          <span className="" style={{ fontWeight: 700, fontSize: 14 }}>
            MINING STATS
          </span>
          <span className="universall_light1" style={{ fontSize: 18 }}>
            22/05/2022
          </span>
        </div>
        <button className="apollo_details_mining_stats_icon">
          <CalendarIcon />
        </button>
      </div>
      <div className="apollo_details_mining_stats_cells">
        <div className="apollo_details_mining_stats_fonts_normal universall_light1">
          BLOCK REWARDS
        </div>
        <div className="">
          <span className="apollo_details_mining_stats_fonts_bold">
            586.352 AMB
          </span>
          <span className=""> / $ 2,67</span>
        </div>
      </div>
      <div className="apollo_details_mining_stats_cells">
        <div className="apollo_details_mining_stats_fonts_normal universall_light1">
          TRANSACTIONS REWARDS
        </div>
        <div className="">
          <span className="apollo_details_mining_stats_fonts_bold">
            586.352 AMB
          </span>
          <span className=""> / $ 2,67</span>
        </div>
      </div>
      <div className="apollo_details_mining_stats_cells">
        <div className="apollo_details_mining_stats_fonts_normal universall_light1">
          TOTAL BLOCKS MINED
        </div>
        <div className="apollo_details_mining_stats_fonts_bold">176</div>
      </div>
    </div>
  );
};

export default ApolloDetailsMiningStats;
