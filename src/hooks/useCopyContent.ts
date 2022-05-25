import { useEffect, useState } from 'react';

const useCopyContent = (address: any) => {
  const [isCopy, setIsCopy] = useState(false);
  const [isCopyPopup, setIsCopyPopup] = useState(false);

  const copyContent = () => {
    address && navigator.clipboard.writeText(address);
    setIsCopyPopup(false);
    setIsCopy(true);
  };
  useEffect(() => {
    const timer = setTimeout(() => setIsCopy(false), 1800);
    const timerPopup = setTimeout(() => setIsCopyPopup(true), 1000);
    return () => {
      clearTimeout(timer);
      clearTimeout(timerPopup);
    };
  }, [isCopy, isCopyPopup]);

  return { isCopy, isCopyPopup, copyContent };
};

export default useCopyContent;
