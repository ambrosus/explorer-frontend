import * as React from 'react'
import { SVGProps, memo } from 'react'

const OutgoingTransaction = (props: SVGProps<SVGSVGElement>) => (
	<svg
		{...props}
		width={16}
		height={16}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M6.14 7.333h1.193v6c0 .367.3.667.667.667.367 0 .667-.3.667-.667v-6H9.86c.3 0 .447-.36.233-.566l-1.86-1.86a.33.33 0 0 0-.473 0L5.9 6.767a.333.333 0 0 0 .24.566Zm7.193-4.666c0-.367-.3-.667-.666-.667H3.333c-.366 0-.666.3-.666.667 0 .366.3.666.666.666h9.334c.366 0 .666-.3.666-.666Z"
			fill="#808A9D"
		/>
	</svg>
)

const Memo = memo(OutgoingTransaction)
export default Memo
