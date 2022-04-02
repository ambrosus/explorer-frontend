import React from 'react';
import ArrowDown from '../../assets/icons/Arrows/ArrowDown';
import Eth from '../../assets/icons/Cryptos/Eth';
import GreenCircle from '../../assets/icons/GreenCircle';
import OrangeCircle from '../../assets/icons/OrangeCircle';

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
	const online: any = txfee === 'Pending' ? <OrangeCircle /> : <GreenCircle />;

	return (
		<>
			<div className='addressDetails__tbody-td'>{txhash}</div>
			<div className='addressDetails__tbody-td'>
				{method === 'Method' ? (
					<>
						{method}
						<button style={{ display: 'flex', alignItems: 'center' }}>
							<ArrowDown />
						</button>
					</>
				) : (
					method
				)}
			</div>
			<div className='addressDetails__tbody-td'>{from}</div>
			<div className='addressDetails__tbody-td'>{to}</div>
			<div className='addressDetails__tbody-td'>{date}</div>
			<div className='addressDetails__tbody-td'>{block}</div>
			<div className='addressDetails__tbody-td'>
				{amount === 'Amount' ? (
					amount
				) : (
					<>
						<span className='universall__indent-icon'>
							<Eth />
						</span>
						{amount}
					</>
				)}
			</div>
			<div className='addressDetails__tbody-td' style={{ padding: 0 }}>
				{txfee === 'txFee' ? (
					txfee
				) : (
					<>
						<span className='universall__indent-icon' style={{ display: 'flex', alignItems: 'center' }}>
							{online}
						</span>
						{txfee}
					</>
				)}
			</div>
		</>
	);
};

export default AddressBlock;
