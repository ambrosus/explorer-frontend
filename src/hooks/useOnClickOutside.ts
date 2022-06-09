import { useEffect } from 'react';

export const useOnClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: (event: MouseEvent) => void,
) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const { current } = ref;
      if (!current || current.contains(event.target as Node)) {
        return;
      }
      setTimeout(() => handler(event), 50);
    };

    document.addEventListener('mousedown', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
};
