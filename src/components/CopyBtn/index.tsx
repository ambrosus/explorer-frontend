import ContentCopy from 'assets/icons/CopyIcons/ContentCopy';
import ContentCopyed from 'assets/icons/CopyIcons/ContentCopyed';
import CopyPopUp from 'assets/icons/CopyIcons/CopyPopUp';
import useCopyContent from 'hooks/useCopyContent';
import useDeviceSize from 'hooks/useDeviceSize';
import { useParams } from 'react-router-dom';
import { TParams } from 'types';

const CopyBtn = () => {
  const { address }: TParams = useParams();
  const { isCopy, copyContent, isCopyPopup } = useCopyContent(address);
  const { FOR_TABLET } = useDeviceSize();

  return (
    <button className="address_button" onClick={copyContent}>
      {isCopy ? <ContentCopyed /> : <ContentCopy />}

      {FOR_TABLET && isCopyPopup && isCopy && (
        <div className="address_button_copyed">
          <CopyPopUp x={3} y={20} values="Copied" />
        </div>
      )}
    </button>
  );
};

export default CopyBtn;
