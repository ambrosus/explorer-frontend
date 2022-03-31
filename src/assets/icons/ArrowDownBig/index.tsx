import * as React from 'react';
import { SVGProps, memo } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
	<svg {...props} width={24} height={24} fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path d='m6 9 6 6 6-6' stroke='#808A9D' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);

const Memo = memo(SvgComponent);
export default Memo;
