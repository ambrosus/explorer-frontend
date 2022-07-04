import CopyBtn from 'components/CopyBtn';
import useDeviceSize from 'hooks/useDeviceSize';
import { useParams } from 'react-router-dom';
import { sliceDataString } from 'utils/helpers';

const BundleDetailsMain = () => {
  const { address } = useParams();

  const sptilStr = sliceDataString(address);
  const { FOR_PHONE } = useDeviceSize();
  return (
    <>
      <div className="bundle_details_main">
        <h1>Bundle Details</h1>
        <div className="bundle_details_main_cells">
          <div className="bundle_details_main_cells_name">ID</div>

          <div className="bundle_details_main_cells_address">
            {FOR_PHONE ? (
              <>{address}</>
            ) : (
              <div>
                {sptilStr.map((item: any) => (
                  <p>{item}</p>
                ))}
              </div>
            )}
            <CopyBtn />
          </div>
        </div>
      </div>
    </>
  );
};

export default BundleDetailsMain;
