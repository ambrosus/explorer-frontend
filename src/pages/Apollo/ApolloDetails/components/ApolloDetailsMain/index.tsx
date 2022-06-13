import ContentCopy from 'assets/icons/CopyIcons/ContentCopy';
import {TParams} from "../../../../../types";
import {useParams} from "react-router-dom";

const AtlasDetailsBalance = () => {
  const { address}: TParams = useParams();

  return (
    <div className="apollo_details_main">
      <div className="apollo_details_main_nd">
        <h1>ND Apollo</h1>
        <div className="apollo_details_main_online">ONLINE</div>
      </div>
      <div className="apollo_details_main_address">
        <div className="apollo_details_main_cell universall_bold">Address</div>
        <div className="apollo_details_main_cell">
          {address}
        </div>
        <button className="apollo_details_main_cell">
          <ContentCopy />
        </button>
      </div>
    </div>
  );
};

export default AtlasDetailsBalance;
