import React from 'react'

import AnimatedLoader from './LoaderSvg'

const Loader = () => (
	<div
		style={{
			position: 'relative',
			height: 0,
			margin: '0 auto',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			width: '100%',
		}}
	>
		<div className="Loader">
			<div className="Spinner">
				<AnimatedLoader />
			</div>
		</div>
	</div>
)
export default Loader
