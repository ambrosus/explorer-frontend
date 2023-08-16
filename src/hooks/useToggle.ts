import { useState } from 'react';

const useToggle = (initialState: boolean = false) => {
  const [toggled, setToggled] = useState(initialState);

  return {
    toggled,
    setToggle: (e?: any) => {
      //   e.stopPropagation();
      setToggled((state) => !state);
    },
  };
};

export default useToggle;
