import * as React from 'react';
import { SVGProps, memo } from 'react';

const ContentCopy = (props: SVGProps<SVGSVGElement>) => (
	<svg {...props} width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M15 1H4c-1.1 0-2 .9-2 2v13c0 .55.45 1 1 1s1-.45 1-1V4c0-.55.45-1 1-1h10c.55 0 1-.45 1-1s-.45-1-1-1Zm4 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2Zm-1 16H9c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1Z'
			fill='#808A9D'
		/>
	</svg>
);

const Memo = memo(ContentCopy);
export default Memo;
