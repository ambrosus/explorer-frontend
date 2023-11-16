import { useState } from 'react';

const useToggle = (initialState: boolean = false) => {
  const [toggled, setToggled] = useState(initialState);

  return {
    toggled,
    setToggle: (isOpen?: any) => {
      //   e.stopPropagation();
      setToggled((state) => (typeof isOpen === 'boolean' ? isOpen : !state));
    },
  };
};

export default useToggle;
