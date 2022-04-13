import React, { useState } from 'react';
import CalendarIcon from '../../assets/icons/CalendarIcon';
import Calendar from '../Calendar';

const ExportCsv = () => {
	const [isShow, setIsShow] = useState(false);
	return (
		<div className='tabs__exportModal'>
			<div className='tabs__exportCsv'>
				<button className='tabs__exportCsv-btn' onClick={() => setIsShow(!isShow)}>
					<CalendarIcon />
					<span className='tabs__exportCsv-text'>ExportCsv</span>
				</button>
			</div>
			{isShow && <Calendar />}
		</div>
	);
};

export default ExportCsv;
