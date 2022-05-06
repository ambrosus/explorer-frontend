import * as React from 'react'
import { SVGProps, memo } from 'react'

const GreenCircle = (props: SVGProps<SVGSVGElement>) => (
	<svg
		{...props}
		width="8"
		height="8"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<rect width={8} height={8} rx={4} fill="#1ACD8C" />
	</svg>
)

const Memo = memo(GreenCircle)
export default Memo
