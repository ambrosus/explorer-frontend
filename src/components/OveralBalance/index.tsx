import React, { useEffect, useState } from 'react';
import API from '../../API/api';

type OveralBalanceProps = {
	token: string | number;
	amount: string | number;
};

const OveralBalance: React.FC<OveralBalanceProps> = ({ token, amount }) => {
	const [amountInUsd, setAmountInUsd] = useState(0);
	// @ts-ignore
	useEffect(async () => {
		const { total_price_usd } = await API.getTokenMountPrice().then((res) => res);
		if (total_price_usd) {
			setAmountInUsd(total_price_usd * Number(token));
		}
	}, [token]);
	return (
		<div className='addressDetails__div'>
			<span className='addressDetails__div-span universall__dark' style={{ fontWeight: 700 }}>
				Balance
			</span>
			<span className='addressDetails__div-span universall__dark'>{`${token} AMB`} </span>
			<span className='addressDetails__div-span universall__dark'>/</span>
			<span
				className='addressDetails__div-span universall__light2'>{`$ ${amountInUsd && amountInUsd.toFixed(2)}`}</span>
		</div>
	);
};

export default OveralBalance;
