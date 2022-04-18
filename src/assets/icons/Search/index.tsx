import { SVGProps, memo } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => {
	const { fill } = props;
	return (
		<>
			<svg {...props} width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'>
				<path
					d='M12.5 11h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34A6.505 6.505 0 0 0 .05 7.32c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L12.5 11Zm-6 0C4.01 11 2 8.99 2 6.5S4.01 2 6.5 2 11 4.01 11 6.5 8.99 11 6.5 11Z'
					fill={fill}
				/>
			</svg>
		</>
	);
};

const Memo = memo(SvgComponent);
export default Memo;
