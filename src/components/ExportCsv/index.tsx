import React, { useEffect, useRef, useState } from 'react';
import CalendarIcon from '../../assets/icons/CalendarIcon';

import Calendar from '../Calendar';

const ExportCsv = () => {
	const [isShow, setIsShow] = useState(false);
	const style: any = isShow ? { borderColor: '#05060f' } : null;

	return (
		<div className='tabs__exportModal'>
			<div className='tabs__exportCsv'>
				<button className='tabs__exportCsv-btn' style={style} onClick={() => setIsShow(true)}>
					<CalendarIcon />
					<span className='tabs__exportCsv-text'>ExportCsv</span>
				</button>
			</div>
			{isShow && <Calendar setIsShow={setIsShow} />}
		</div>
	);
};

export default ExportCsv;
