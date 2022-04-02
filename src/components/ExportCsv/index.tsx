import React, { useState } from 'react';

const ExportCsv = () => {
	const [isShow, setIsShow] = useState(false);
	return (
		<>
			<button className='exportCsv' onClick={() => setIsShow(!isShow)}>
				ExportCsv
			</button>
		</>
	);
};

export default ExportCsv;
