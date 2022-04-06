import React from 'react';
import ArrowDown from '../../assets/icons/Arrows/ArrowDown';

type AddressBlockProps = {
	txhash: string | number;
	method: string | number;
	from: string | number;
	to: string | number;
	date: string | number;
	block: string | number;
	amount: any;
	txfee: string | number;
	token: string;
};

const AddressBlock: React.FC<AddressBlockProps> = ({ txhash, method, from, to, date, block, amount, txfee, token }) => {
	const sortMethod = () => console.log('clickMethod');

	const isTxHash = txhash === null ? null : <div className='addressDetails__thead-td'>{txhash}</div>;
	const isMethod =
		method === null ? null : (
			<div className='addressDetails__thead-td'>
				<button
					className='universall__light2'
					style={{ display: 'flex', alignItems: 'center', fontWeight: 700, fontSize: '0.86em', lineHeight: '1.77em' }}
					onClick={sortMethod}
				>
					{method}
					<ArrowDown />
				</button>
			</div>
		);
	const isFrom = from === null ? null : <div className='addressDetails__thead-td'>{from}</div>;
	const isTo = to === null ? null : <div className='addressDetails__thead-td'>{to}</div>;
	const isDate = date === null ? null : <div className='addressDetails__thead-td'>{date}</div>;
	const isBlock = block === null ? null : <div className='addressDetails__thead-td'>{block}</div>;
	const isAmount = amount === null ? null : <div className='addressDetails__thead-td'>{amount}</div>;
	const isTxFee = txfee === null ? null : <div className='addressDetails__thead-td'>{txfee}</div>;
	const isToken = token === null ? null : <div className='addressDetails__thead-td'>{token}</div>;

	return (
		<>
			{isTxHash}
			{isMethod}
			{isFrom}
			{isTo}
			{isDate}
			{isBlock}
			{isAmount}
			{isTxFee}
			{isToken}
		</>
	);
};

export default AddressBlock;
