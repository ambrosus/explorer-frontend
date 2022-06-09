import { useEffect, useRef } from 'react';

//TODO не юзается
export default function usePrevious(value: any, ...deps: any) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();
  // Store current value in ref
  useEffect(() => {
    ref.current = value !== 0 ? value : 0;
  }, [value, ...deps]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}
