import React from 'react';

type OveralBalanceProps = {
	token: string | number;
	amount: string | number;
};

const OveralBalance: React.FC<OveralBalanceProps> = ({ token, amount }) => {
	return (
		<div className='addressDetails__div'>
			<span className='addressDetails__div-span universall__dark' style={{ fontWeight: 700 }}>
				Balance
			</span>
			<span className='addressDetails__div-span universall__dark'>{`${token} AMB`} </span>
			<span className='addressDetails__div-span universall__dark'>/</span>
			<span className='addressDetails__div-span universall__light2'>{`$ ${amount}`}</span>
		</div>
	);
};

export default OveralBalance;
