import * as React from 'react';
import { SVGProps, memo } from 'react';

const ArrowUpSmall = (props: SVGProps<SVGSVGElement>) => (
	<svg {...props} width={8} height={6} fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path d='M7.633 4.36 4.768.922a1 1 0 0 0-1.536 0L.367 4.36A1 1 0 0 0 1.135 6h5.73a1 1 0 0 0 .768-1.64Z' fill='#A6B0C3' />
	</svg>
);

const Memo = memo(ArrowUpSmall);
export default Memo;
