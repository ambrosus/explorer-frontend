import { useTypedSelector } from 'hooks/useTypedSelector';
import { useCallback, useRef, useState } from 'react';

const useLastCardRef = () => {
  const observer = useRef<IntersectionObserver>();
  const [pageNum, setPageNum] = useState(1);

  const { loading, data: addressData } = useTypedSelector(
    (state: any) => state.position,
  );
  const lastCardRef = useCallback(
    (node: Element) => {
      if (loading) return;
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          addressData &&
          pageNum < addressData?.meta?.totalPages
        ) {
          setPageNum((prevNum) => prevNum + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading],
  );
  return { lastCardRef, pageNum };
};

export default useLastCardRef;
