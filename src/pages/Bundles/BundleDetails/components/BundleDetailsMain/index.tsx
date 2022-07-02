import CopyBtn from 'components/CopyBtn';
import { useParams } from 'react-router-dom';

const BundleDetailsMain = () => {
  const { address } = useParams();

  return (
    <>
      <div className="bundle_details_main">
        <h1>Bundle Details</h1>
        <div className="bundle_details_main_cells">
          <div className="bundle_details_main_cells_name">ID</div>

          <div className="bundle_details_main_cells_address">
            {address}
            <CopyBtn />
          </div>
        </div>
      </div>
    </>
  );
};

export default BundleDetailsMain;
