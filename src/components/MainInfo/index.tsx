import React from 'react'

import getMainInfoIcon from '../../config'
import { MainInfoProps } from '../../pages/Home/home.interfaces'

const MainInfo: React.FC<MainInfoProps> = ({ name, value }) => {
	const numberWithCommas = (number: number) =>
		number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

	const currenCurrency = (nameCurrency: string) => {
		switch (nameCurrency) {
			case 'TOTAL SUPPLY':
				return `${value.toFixed()} AMB`

			case 'MARKET CAP':
				return `${value.toFixed()} USD`

			default:
				return value
		}
	}

	const updatedValue = numberWithCommas(currenCurrency(name))

	return (
		<>
			<div className="mainInfo__td">
				<div className="mainInfo__icon">{getMainInfoIcon(name)}</div>
				<div className="mainInfo__text">
					<p className="mainInfo__span-light">{name}</p>
					<p className="mainInfo__span-dark">{updatedValue}</p>
				</div>
			</div>
		</>
	)
}

export default MainInfo
