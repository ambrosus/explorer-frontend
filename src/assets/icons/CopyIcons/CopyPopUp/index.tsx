import * as React from 'react';
import { SVGProps, memo } from 'react';

const CopyPopUp = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width={56}
    height={29}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24.414 1.414a2 2 0 0 0-2.828 0l-3.329 3.328c-.08.081-.153.167-.217.258H8a8 8 0 0 0-8 8v8a8 8 0 0 0 8 8h30a8 8 0 0 0 8-8v-8a8 8 0 0 0-8-8H27.96a2.011 2.011 0 0 0-.217-.258l-3.329-3.328Z"
      fill="#808A9D"
    />
    <text
      x={props.x}
      y={props.y}
      fill="#fff"
      style={{ fontSize: 11, fontWeight: 700 }}
    >
      {props.values}
    </text>
  </svg>
);

const Memo = memo(CopyPopUp);
export default Memo;
