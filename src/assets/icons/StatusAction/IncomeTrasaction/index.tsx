import * as React from 'react';
import { SVGProps, memo } from 'react';

const IncomeTrasaction = (props: SVGProps<SVGSVGElement>) => (
	<svg {...props} width={16} height={16} fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M9.86 8.667H8.667v-6C8.667 2.3 8.367 2 8 2c-.367 0-.667.3-.667.667v6H6.14a.33.33 0 0 0-.233.566l1.86 1.86a.33.33 0 0 0 .473 0l1.86-1.86a.333.333 0 0 0-.24-.566Zm-7.193 4.666c0 .367.3.667.666.667h9.334c.366 0 .666-.3.666-.667 0-.366-.3-.666-.666-.666H3.333c-.366 0-.666.3-.666.666Z'
			fill='#1ACD8C'
		/>
	</svg>
);

const Memo = memo(IncomeTrasaction);
export default Memo;
