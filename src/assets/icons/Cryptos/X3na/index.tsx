import * as React from 'react';
import { memo, SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="128"
    height="128"
    viewBox="0 0 128 128"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="128" height="128" rx="64" fill="white" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M64 128C99.3462 128 128 99.3462 128 64C128 28.6538 99.3462 0 64 0C28.6538 0 0 28.6538 0 64C0 72.9275 1.8279 81.428 5.12985 89.1478L27.7145 62.8473L10.8753 42.6665H27.8008L36.2019 52.715L44.5457 42.6665H61.8324L44.7795 62.8473L63.9994 85.6773H46.8399L36.2922 72.9796L11.8787 101.149C23.4847 117.403 42.5048 128 64 128ZM69.334 53.4771V42.6665H112.001V54.6039L103.882 63.9319L112.001 73.2346L112.001 85.3332H69.4389V74.5636H83.3841H97.8831L93.3272 69.3919H81.6599V58.6801H93.3272L97.8228 53.4771H89.2995H69.334Z"
      fill="#5E53FF"
    />
  </svg>
);

const Memo = memo(SvgComponent);
export default Memo;
