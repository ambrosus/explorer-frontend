import ContentCopy from 'assets/icons/CopyIcons/ContentCopy';
import ContentCopyed from 'assets/icons/CopyIcons/ContentCopyed';
import CopyPopUp from 'assets/icons/CopyIcons/CopyPopUp';
import useDeviceSize from 'hooks/useDeviceSize';
import React, { useEffect, useState } from 'react';

const CopyIcon = ({ content }: any) => {
  const [isCopy, setIsCopy] = useState(false);
  const [isCopyPopup, setIsCopyPopup] = useState(false);

  const copyContent = (content: any) => {
    navigator.clipboard.writeText(content);
    setIsCopyPopup(false);
    setIsCopy(true);
  };
  useEffect(() => {
    const timer = setTimeout(() => setIsCopy(false), 1000);
    const timerPopup = setTimeout(() => setIsCopyPopup(true), 500);
    return () => {
      clearTimeout(timer);
      clearTimeout(timerPopup);
    };
  }, [isCopy, isCopyPopup, content]);

  const { FOR_TABLET } = useDeviceSize();

  return (
    <div className="btn-contract-icon" onClick={() => copyContent(content)}>
      {isCopy ? <ContentCopyed /> : <ContentCopy />}
      {FOR_TABLET && isCopyPopup && isCopy && (
        <div className="button_copy">
          <CopyPopUp x={3} y={20} values="Copyed" />
        </div>
      )}
    </div>
  );
};

export default CopyIcon;
