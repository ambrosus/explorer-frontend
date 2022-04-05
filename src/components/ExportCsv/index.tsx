import React, { useState } from 'react';
import CalendarIcon from '../../assets/icons/CalendarIcon';
import Calendar from '../Calendar';

const ExportCsv = () => {
	const [isShow, setIsShow] = useState(false);
	return (
		<div className='tabs__exportModal'>
			<div style={{ position: 'absolute' }}>
				<div className='tabs__exportCsv'>
					<button className='tabs__exportCsv-btn' onClick={() => setIsShow(!isShow)}>
						<CalendarIcon />
						<span className='tabs__exportCsv-text'>ExportCsv</span>
					</button>
				</div>
				<div className='tabs__calendar'>{isShow && <Calendar />}</div>
			</div>
		</div>
	);
};

export default ExportCsv;
