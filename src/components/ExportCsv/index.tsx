import CalendarIcon from 'assets/icons/CalendarIcon'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import React, { useRef, useState } from 'react'

import Calendar from '../Calendar'

const ExportCsv = () => {
	const [isShow, setIsShow] = useState(false)
	const style: any = isShow ? { borderColor: '#05060f' } : null
	const calendarRef = useRef(null)
	useOnClickOutside(calendarRef, () => setIsShow(false))

	return (
		<>
			<div ref={calendarRef} style={{ zIndex: 1 }}>
				<div className="tabs__exportCsv">
					<button
						className="tabs__exportCsv-btn"
						style={style}
						onClick={() => {
							setIsShow(!isShow)
						}}
					>
						<CalendarIcon />
						<span className="tabs__exportCsv-text">ExportCsv</span>
					</button>
				</div>
				{isShow && <Calendar />}
			</div>
		</>
	)
}

export default ExportCsv
