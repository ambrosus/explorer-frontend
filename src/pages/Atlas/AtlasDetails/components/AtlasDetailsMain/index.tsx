import ContentCopy from 'assets/icons/CopyIcons/ContentCopy';

const AtlasDetailsMain = () => {
  return (
    <div className="atlas_details_main">
      <div className="atlas_details_main_nd">
        <h1>ND Atlas</h1>
        <div className="atlas_details_main_online">ONBOARDED</div>
      </div>
      <div className="atlas_details_main_address">
        <div className="atlas_details_main_cell universall_bold">Address</div>
        <div className="atlas_details_main_cell">
          0xF977814e90dA44bFA03b6295A0616a897441aceC
        </div>
        <button className="atlas_details_main_cell">
          <ContentCopy />
        </button>
      </div>
    </div>
  );
};

export default AtlasDetailsMain;
