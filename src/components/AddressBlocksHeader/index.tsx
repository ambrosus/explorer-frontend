import React from 'react';
import ArrowDownSmall from '../../assets/icons/Arrows/ArrowDownSmall';

type AddressBlockProps = {
	txhash: string | number;
	method: string | number;
	from: string | number;
	to: string | number;
	date: string | number;
	block: string | number;
	amount: any;
	txfee: string | number;
};

const AddressBlock: React.FC<AddressBlockProps> = ({ txhash, method, from, to, date, block, amount, txfee }) => {
	const sortMethod = () => console.log('clickMethod');

	return (
		<>
			<div className='addressDetails__thead-td'>{txhash}</div>
			<div className='addressDetails__thead-td'>
				<button
					className='universall__light2'
					style={{ display: 'flex', alignItems: 'center', fontWeight: 700, fontSize: '0.86em', lineHeight: '1.77em' }}
					onClick={sortMethod}
				>
					{method}
					<ArrowDownSmall />
				</button>
			</div>
			<div className='addressDetails__thead-td'>{from}</div>
			<div className='addressDetails__thead-td'>{to}</div>
			<div className='addressDetails__thead-td'>{date}</div>
			<div className='addressDetails__thead-td'>{block}</div>
			<div className='addressDetails__thead-td'>{amount}</div>
			<div className='addressDetails__thead-td' style={{ padding: 0 }}>
				{txfee}
			</div>
		</>
	);
};

export default AddressBlock;
