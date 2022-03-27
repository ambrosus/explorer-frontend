import * as React from 'react';
import { SVGProps, memo } from 'react';

const AroowDown = (props: SVGProps<SVGSVGElement>) => (
	<svg {...props} width='1em' height='1em' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path d='m4 6 4 4 4-4' stroke='#808A9D' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);

const Memo = memo(AroowDown);
export default Memo;
