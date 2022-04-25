import * as React from 'react'
import { SVGProps, memo } from 'react'

const Eth = (props: SVGProps<SVGSVGElement>) => (
	<svg
		{...props}
		width={16}
		height={16}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle cx={8} cy={8} r={8} fill="#A6B0C3" />
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M7.999 2 4 7.867l3.999 2.09v-.001l4-2.09-4-5.866v.002V2Zm0 12L4 9.017l3.999 2.089 4-2.09L8 14Z"
			fill="#fff"
		/>
	</svg>
)

const Memo = memo(Eth)
export default Memo
