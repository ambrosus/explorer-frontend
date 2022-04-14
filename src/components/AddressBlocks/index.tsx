import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Eth from '../../assets/icons/Cryptos/Eth';
import GreenCircle from '../../assets/icons/GreenCircle';
import OrangeCircle from '../../assets/icons/OrangeCircle';

type AddressBlockProps = {
	txhash: string | number;
	method: string | number;
	from: string | number;
	to: string | number;
	date: string | number;
	block: string | number | null;
	amount: any;
	txfee: string | number | null;
	token?: any;
};

const AddressBlock: React.FC<AddressBlockProps> = ({ txhash, method, from, to, date, block, amount, txfee, token }) => {
	const online: any = txfee === 'Pending' ? <OrangeCircle /> : <GreenCircle />;

	const { type } = useParams();

	const isTxHash = txhash === null ? null : <div className='addressDetails__thead-td'>{txhash}</div>;
	const isMethod = method === null ? null : <div className='addressDetails__tbody-td'>{method}</div>;
	const isFrom = from === null ? null : <div className='addressDetails__thead-td'>{from}</div>;
	const isTo = to === null ? null : <div className='addressDetails__thead-td'>{to}</div>;
	const isDate = date === null ? null : <div className='addressDetails__thead-td'>{date}</div>;
	const isBlock: any = type === 'ERC-20_Tx' ? null : <div className='addressDetails__thead-td'>{block}</div>;
	const isAmount =
		amount === null ? null : (
			<div className='addressDetails__tbody-td'>
				<span className='universall__indent-icon'>
					<Eth />
				</span>
				{amount}
			</div>
		);

	const isTxFee: any =
		type === 'ERC-20_Tx' ? null : (
			<div className='addressDetails__tbody-td' style={{ padding: 0 }}>
				<span className='universall__indent-icon' style={{ display: 'flex', alignItems: 'center' }}>
					{online}
				</span>
				{txfee}
			</div>
		);

	const isToken: any = type === 'ERC-20_Tx' ? <div className='addressDetails__thead-td'>{token}</div> : null;

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
