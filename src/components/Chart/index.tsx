import React, { useEffect, useMemo } from 'react'
import { Area, AreaChart, Line, Tooltip, XAxis, YAxis } from 'recharts'

import API from '../../API/api'
import {
	LatestTransactionsProps,
	ResultHomePageData,
} from '../../pages/Home/types'

const data = [
	{ name: 'Feb 18', Transactions: 4000, Price: 100000 },
	{ name: 'Feb 19', Transactions: 3000, Price: 200000 },
	{ name: 'Feb 20', Transactions: 2000, Price: 300000 },
	{ name: 'Feb 21', Transactions: 2780, Price: 400000 },
	{ name: 'Feb 22', Transactions: 1890, Price: 500000 },
	{ name: 'Feb 23', Transactions: 2390, Price: 600000 },
	{ name: 'Feb 24', Transactions: 3490, Price: 700000 },
]

type CustomTooltipProps = {
	payload?: any
	label?: string
	active?: boolean
}

export const CustomTooltip = ({
	payload,
	label,
	active,
}: CustomTooltipProps) => {
	// console.log('active', active);
	if (active) {
		return (
			<div
				className="custom-tooltip"
				style={{
					border: '1px solid #ccc',
					padding: '10px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-start',
					alignItems: 'flex-start',
					backgroundColor: 'rgba(255, 255, 255, 0.7)',
					borderRadius: '5px',
					boxShadow: '0 0 5px #ccc',
					width: '200px',
					fontSize: '14px',
					color: '#333',
				}}
			>
				<p className="intro">{label}</p>
				<p className="label">Price : {`${payload[0].payload?.Price}`}</p>
				<p className="label">
					Transactions :{`${payload[0].payload?.Transactions}`}
				</p>
			</div>
		)
	}

	return null
}

const Chart = () => {
	const getTransactions = useMemo(
		() => async () => {
			console.log('getTransactions')
			// TODO : get transactions data
			// const { data: explorerTrans }: any = await API.getTransactions({
			// 	limit: 100000
			// });
			// console.log("explorerTrans", explorerTrans);
		},
		[]
	)

	useEffect(() => {
		getTransactions()
	}, [])

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
				height: '100%',
			}}
		>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					flexDirection: 'row',
				}}
			>
				<span>Transaction HISTORY</span>
				<span>Last 7 days</span>
			</div>
			<div>
				<AreaChart width={318} height={120} data={data}>
					<Area dataKey="Transactions" stroke="#212121" fill="url(#colorUv)" />
					<Line type="monotone" dataKey="Transactions" stroke="#8884d8" />
					<XAxis
						fontSize={12}
						interval={2}
						axisLine={false}
						tickLine={false}
						style={{
							fontSize: 12,
							fontFamily: 'Halvar Breitschrift',
							color: '#212121',
						}}
						color="#212121"
						lightingColor="#212121"
						colorInterpolation="#212121"
						stopColor="#212121"
						dataKey="name"
					/>
					<YAxis hide domain={['auto', 'auto']} />
					<Tooltip cursor={false} content={<CustomTooltip />} />
				</AreaChart>
			</div>
		</div>
	)
}

export default Chart
