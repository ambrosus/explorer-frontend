import { useEffect, useState } from 'react';

const useActive = ({ onChange, refEl }: any) => {
  const [value, setValue] = useState(false);
  const handleMouseDown = () => {
    setValue(true);
    onChange(true);
  };
  const handleMouseUp = () => {
    setValue(false);
    onChange(false);
  };
  useEffect(() => {
    if (refEl && refEl.current) {
      refEl.current.addEventListener('mousedown', handleMouseDown);
      refEl.current.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      if (refEl && refEl.current) {
        refEl.current.removeEventListener('mousedown', handleMouseDown);
        refEl.current.removeEventListener('mouseup', handleMouseUp);
      }
    };
  }, []);

  return value;
};
export default useActive;
