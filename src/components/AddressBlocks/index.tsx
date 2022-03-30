import React from 'react';
import ArrowDownSmall from '../../assets/icons/ArrowDownSmall';
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
						<button>
							<ArrowDownSmall />
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
			<div className='addressDetails__tbody-td'>
				{txfee === 'txFee' ? (
					txfee
				) : (
					<>
						{online} {txfee}
					</>
				)}
			</div>
		</>
	);
};

export default AddressBlock;
