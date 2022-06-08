import ContentCopy from 'assets/icons/CopyIcons/ContentCopy';

const ApolloDetailsMain = () => {
  return (
    <div className="apollo_details_main">
      <div className="apollo_details_main_nd">
        <h1>ND Apollo</h1>
        <div className="apollo_details_main_online">ONLINE</div>
      </div>
      <div className="apollo_details_main_address">
        <div className="apollo_details_main_cell universall_bold">Address</div>
        <div className="apollo_details_main_cell">
          0xF977814e90dA44bFA03b6295A0616a897441aceC
        </div>
        <button className="apollo_details_main_cell">
          <ContentCopy />
        </button>
      </div>
    </div>
  );
};

export default ApolloDetailsMain;
