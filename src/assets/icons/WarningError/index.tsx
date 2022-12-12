import * as React from 'react';
import { SVGProps, memo } from 'react';

const WarningError = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width={20}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.47 18h15.06c1.54 0 2.5-1.67 1.73-3L11.73 1.99c-.77-1.33-2.69-1.33-3.46 0L.74 15c-.77 1.33.19 3 1.73 3ZM10 11c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1Zm1 4H9v-2h2v2Z"
      fill="#FF4747"
    />
  </svg>
);

const Memo = memo(WarningError);
export default Memo;
