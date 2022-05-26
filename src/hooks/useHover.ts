import { useEffect, useRef, useState } from 'react';

const useHover = ({ refs }: any) => {
  const [value, setValue] = useState(false);
  const ref: any = useRef(refs);
  // console.log(ref);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);
  useEffect(
    () => {
      const node: any = ref.current;
      console.log(node);

      if (node) {
        node.addEventListener('mouseover', handleMouseOver);
        node.addEventListener('mouseout', handleMouseOut);
        return () => {
          node.removeEventListener('mouseover', handleMouseOver);
          node.removeEventListener('mouseout', handleMouseOut);
        };
      }
    },
    [ref.current], // Recall only if ref changes
  );
  return [ref, value];
};

export default useHover;
