import ContentCopy from 'assets/icons/CopyIcons/ContentCopy';
import ContentCopyed from 'assets/icons/CopyIcons/ContentCopyed';
import CopyPopUp from 'assets/icons/CopyIcons/CopyPopUp';
import useCopyContent from 'hooks/useCopyContent';
import useDeviceSize from 'hooks/useDeviceSize';
import { useParams } from 'react-router-dom';

const BundleDetailsMain = () => {
  const { address } = useParams();
  const { isCopy, copyContent, isCopyPopup } = useCopyContent(address);
  const { FOR_TABLET } = useDeviceSize();

  return (
    <>
      <div className="bundle_details_main">
        <h1>Bundle Details</h1>
        <div className="bundle_details_main_cells">
          <div className="bundle_details_main_cells_name">ID</div>
          {/* <div className="bundle_details_main_cell"> */}
          <div className="bundle_details_main_cells_address">
            {address}
            <button className="address_button" onClick={copyContent}>
              {isCopy ? <ContentCopyed /> : <ContentCopy />}

              {FOR_TABLET && isCopyPopup && isCopy && (
                <div className="address_button_copyed">
                  <CopyPopUp x={3} y={20} values="Copyed" />
                </div>
              )}
            </button>
          </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default BundleDetailsMain;
