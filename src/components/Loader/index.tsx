import React from 'react';
import AnimatedLoader from './LoaderSvg';

const Loader = () => (
	<div style={{ position: 'relative', height: 0 }}>
		<div className="Loader">
			<div className="Spinner">
				<AnimatedLoader/>
			</div>
		</div>
	</div>
);
export default Loader;
