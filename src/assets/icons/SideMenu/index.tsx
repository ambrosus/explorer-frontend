import * as React from 'react'
import { SVGProps, memo } from 'react'

const SideMenu = (props: SVGProps<SVGSVGElement>) => (
	<svg
		{...props}
		width={2}
		height={12}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle cx={1} cy={1} r={1} fill="#808A9D" />
		<circle cx={1} cy={6} r={1} fill="#808A9D" />
		<circle cx={1} cy={11} r={1} fill="#808A9D" />
	</svg>
)

const Memo = memo(SideMenu)
export default Memo
