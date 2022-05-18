import * as React from 'react';
import { SVGProps, memo } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        d="M11 21.5c5.799 0 10.5-4.701 10.5-10.5S16.799.5 11 .5.5 5.201.5 11 5.201 21.5 11 21.5Z"
        fill="#212121"
      />
      <path
        d="M18.219 11.01v.005a.342.342 0 0 1-.042.15c-.091.167-2.29 4.1-7.176 4.1s-7.087-3.933-7.178-4.1a.343.343 0 0 1-.042-.15v-.044a.342.342 0 0 1 .036-.125l.002-.002.004-.008c.091-.168 2.291-4.102 7.177-4.102 4.886 0 7.085 3.935 7.177 4.102l.004.008.002.003c.019.039.03.08.034.123V11l.002.01ZM17.49 11c-.37-.574-1.758-2.49-4.275-3.26a3.983 3.983 0 0 1 1.6 2.383.39.39 0 0 1 .299.374.39.39 0 0 1-.287.384.383.383 0 0 1-.436-.19.394.394 0 0 1 .078-.475c-.324-1.46-1.524-2.586-3.002-2.782a.176.176 0 0 1-.033-.007 8.114 8.114 0 0 0-.87 0 .177.177 0 0 1-.032.007 3.525 3.525 0 0 0-1.595.636.179.179 0 0 1-.273-.203.182.182 0 0 1 .066-.09l.048-.035c-2.514.773-3.9 2.684-4.268 3.258.365.569 1.732 2.454 4.206 3.239a3.962 3.962 0 0 1-1.558-2.475.391.391 0 0 1-.25-.41.388.388 0 0 1 .334-.345.386.386 0 0 1 .41.248.394.394 0 0 1-.14.46 3.569 3.569 0 0 0 2.843 2.842c.43.036.862.036 1.291 0a3.528 3.528 0 0 0 1.474-.65.177.177 0 0 1 .252.036.181.181 0 0 1 .02.18.182.182 0 0 1-.06.074l-.057.043c2.48-.783 3.85-2.672 4.215-3.242Zm-3.327.011c0 1.77-1.419 3.21-3.163 3.21-1.744 0-3.163-1.44-3.163-3.21S9.256 7.801 11 7.801c1.744 0 3.163 1.44 3.163 3.21Zm-.357 0c0-1.57-1.259-2.847-2.806-2.847-1.547 0-2.807 1.277-2.807 2.848 0 1.57 1.26 2.847 2.807 2.847s2.806-1.277 2.806-2.848Zm-1.772-.881c0 .344-.17.664-.453.853l.283 1.724a.205.205 0 0 1-.118.23.205.205 0 0 1-.09.019h-1.26a.207.207 0 0 1-.21-.25l.282-1.723c-.402-.27-.56-.79-.376-1.243.183-.452.656-.71 1.128-.615.474.095.814.516.814 1.005Zm2.853 1.34a3.965 3.965 0 0 1-.991 2.21.177.177 0 0 1-.254.014.185.185 0 0 1-.01-.258c.502-.558.817-1.26.9-2.008a.18.18 0 0 1 .198-.158.18.18 0 0 1 .157.2ZM8.41 8.276a.182.182 0 0 1 .006.256 3.603 3.603 0 0 0-.934 1.949.18.18 0 0 1-.203.152.181.181 0 0 1-.15-.206 3.964 3.964 0 0 1 1.028-2.144.177.177 0 0 1 .253-.006v-.001Z"
        fill="#fff"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" transform="translate(.5 .5)" d="M0 0h21v21H0z" />
      </clipPath>
    </defs>
  </svg>
);

const Memo = memo(SvgComponent);
export default Memo;
