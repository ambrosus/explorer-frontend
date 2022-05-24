const MainInfoApollo = () => (
  <div className="main_info_apollo">
    <h1 className="main_info_apollo_heading">Apollo Nodes</h1>
    <div className="main_info_apollo_table">
      <div className="main_info_apollo_cell">
        <span className="main_info_apollo_cell_primary">TOTAL NODES</span>
        <span className="main_info_apollo_cell_secondary">192</span>
      </div>
      <div className="main_info_apollo_cell">
        <span className="main_info_apollo_cell_primary">Online</span>
        <span
          className="main_info_apollo_cell_secondary"
          style={{
            color: '#1acd8c',
          }}
        >
          182
        </span>
      </div>
      <div className="main_info_apollo_cell">
        <span className="main_info_apollo_cell_primary">offline</span>
        <span className="main_info_apollo_cell_secondary">5</span>
      </div>
      <div className="main_info_apollo_cell">
        <span className="main_info_apollo_cell_primary">CONNECTING</span>
        <span className="main_info_apollo_cell_secondary">2</span>
      </div>
      <div className="main_info_apollo_cell">
        <span className="main_info_apollo_cell_primary">
          Avg block / prop. time
        </span>
        <span className="main_info_apollo_cell_secondary">5.16 sec</span>
      </div>
      <div className="main_info_apollo_cell">Chart cell</div>
    </div>
  </div>
);

export default MainInfoApollo;
