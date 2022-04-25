import * as React from 'react'
import { SVGProps, memo } from 'react'

const TotalTransactions = (props: SVGProps<SVGSVGElement>) => (
	<svg
		{...props}
		width="24"
		height="24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="m2.35 16.35 2.79 2.79c.32.32.86.1.86-.35V17h14c.55 0 1-.45 1-1s-.45-1-1-1H6v-1.79c0-.45-.54-.67-.85-.35l-2.79 2.79c-.2.19-.2.51-.01.7ZM21.65 7.65l-2.79-2.79a.501.501 0 0 0-.86.35V7H4c-.55 0-1 .45-1 1s.45 1 1 1h14v1.79c0 .45.54.67.85.35l2.79-2.79c.2-.19.2-.51.01-.7Z"
			fill="#9198BB"
		/>
	</svg>
)

const Memo = memo(TotalTransactions)
export default Memo
