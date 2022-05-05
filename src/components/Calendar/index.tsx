import API from 'API/api'
import { addDays } from 'date-fns'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import React, { useRef, useState } from 'react'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { useParams } from 'react-router-dom'

import { TParams } from '../../types'

const Calendar = ({ setIsShow }: any) => {
	const { address }: TParams = useParams()
	const calendarRef: any = useRef()
	const [dataRange, setDataRange] = useState([
		{
			startDate: new Date(),
			endDate: addDays(new Date(), 7),
			color: '#05060F',
			key: 'selection',
		},
	])

	useOnClickOutside(calendarRef, () => setIsShow(false))

	const changeData = (item: any) => setDataRange([item.selection])

	const exportData = () => {
		if (dataRange) {
			API.followTheLinkRange(
				dataRange[0].startDate,
				dataRange[0].endDate,
				address
			)
		} else {
			API.followTheLinkRange(0, 0, address)
		}
	}

	return (
		<div ref={calendarRef} className="tabs__calendar">
			<DateRange
				editableDateInputs={true}
				onChange={changeData}
				moveRangeOnFirstSelection={false}
				ranges={dataRange}
			/>
			<button className="tabs__calendar-exportCsv" onClick={exportData}>
				Export CSV
			</button>
		</div>
	)
}

export default Calendar
