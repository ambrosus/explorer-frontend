import * as React from 'react';
import { SVGProps, memo } from 'react';

const TotalSupply = (props: SVGProps<SVGSVGElement>) => (
	<svg {...props} width='20' height='20' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path d='M20 7v12c0 .55-.45 1-1 1H7c-.55 0-1 .45-1 1s.45 1 1 1h13c1.1 0 2-.9 2-2V7c0-.55-.45-1-1-1s-1 .45-1 1Z' fill='#9198BB' />
		<path
			d='M16 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2ZM9 16H4v-5h5v5Zm7 0h-5v-5h5v5Zm0-7H4V4h12v5Z'
			fill='#9198BB'
		/>
	</svg>
);

const Memo = memo(TotalSupply);
export default Memo;
