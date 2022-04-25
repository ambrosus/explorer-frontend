import * as React from 'react';
import { memo } from 'react';

const AnimatedLoader  = memo((props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		style={{
			margin: "auto",
			background: "0 0",
			display: "block",
			shapeRendering: "auto",
		}}
		width={100}
		height={100}
		preserveAspectRatio="xMidYMid"
		{...props}
	>
		<circle cx={50} cy={50} r={0} fill="none" stroke="#000" strokeWidth={2}>
			<animate
				attributeName="r"
				repeatCount="indefinite"
				dur="1s"
				values="0;40"
				keyTimes="0;1"
				keySplines="0 0.2 0.8 1"
				calcMode="spline"
				begin="0s"
			/>
			<animate
				attributeName="opacity"
				repeatCount="indefinite"
				dur="1s"
				values="1;0"
				keyTimes="0;1"
				keySplines="0.2 0 0.8 1"
				calcMode="spline"
				begin="0s"
			/>
		</circle>
		<circle cx={50} cy={50} r={0} fill="none" stroke="#000" strokeWidth={2}>
			<animate
				attributeName="r"
				repeatCount="indefinite"
				dur="1s"
				values="0;40"
				keyTimes="0;1"
				keySplines="0 0.2 0.8 1"
				calcMode="spline"
				begin="-0.5s"
			/>
			<animate
				attributeName="opacity"
				repeatCount="indefinite"
				dur="1s"
				values="1;0"
				keyTimes="0;1"
				keySplines="0.2 0 0.8 1"
				calcMode="spline"
				begin="-0.5s"
			/>
		</circle>
	</svg>
));

export default AnimatedLoader;
