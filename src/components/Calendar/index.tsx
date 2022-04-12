import React, { useState, useEffect, DependencyList } from 'react';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const Calendar = () => {
	const [dataRange, setDataRange] = useState<[{}]>([
		{
			startDate: new Date(),
			endDate: addDays(new Date(), 7),
			color: '#05060F',
			key: 'selection',
		},
	]);
	const changeData = (item: any) => setDataRange([item.selection]);
	const exportData = () => console.log('exportData');

	return (
		<div className='tabs__calendar'>
			<DateRange editableDateInputs={true} onChange={changeData} moveRangeOnFirstSelection={false} ranges={dataRange} />
			<button className='tabs__calendar-exportCsv' onClick={exportData}>
				Export CSV
			</button>
		</div>
	);
};

export default Calendar;
