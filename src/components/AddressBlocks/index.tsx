import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Eth from '../../assets/icons/Cryptos/Eth';
import GreenCircle from '../../assets/icons/GreenCircle';
import OrangeCircle from '../../assets/icons/OrangeCircle';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { sliceData10 } from '../../utils/helpers';

type AddressBlockProps = {
	txhash: any;
	method: string | number;
	from: string | number;
	to: string | number;
	date: string | number;
	block: string | number | null;
	amount: any;
	txfee: string | number | null;
	token?: any;
	isLatest?: boolean;
	onClick?: any;
};

const AddressBlock: React.FC<AddressBlockProps> = ({ onClick, isLatest, txhash, method, from, to, date, block, amount, txfee, token }) => {
	const online: any = txfee === 'Pending' ? <OrangeCircle /> : <GreenCircle />;
	const { addFilter } = useActions();
	const navigate = useNavigate();
	const { address } = useParams();
	const { data: addressData } = useTypedSelector((state: any) => state.position);
	const { type } = useParams();

	const isTxHash = txhash === null ? null : <div className='addressDetails__tbody-td universall__light2'>{sliceData10(txhash)}</div>;
	const isMethod = method === null ? null : <div className='addressDetails__tbody-td'>{method}</div>;
	const isFrom = from === null ? null : <div className='addressDetails__tbody-td universall__light2'>{from}</div>;
	const isTo = to === null ? null : <div className='addressDetails__tbody-td universall__light2'>{to}</div>;
	const isDate = date === null ? null : <div className='addressDetails__tbody-td'>{date}</div>;
	const isBlock: any = type === 'ERC-20_Tx' ? null : <div className='addressDetails__tbody-td'>{block}</div>;
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

	const isToken: any =
		type === 'ERC-20_Tx' ? (
			<div className='addressDetails__tbody-td'>
				{!isLatest ? (
					token
				) : (
					<div
						onClick={() => {
							// eslint-disable-next-line array-callback-return
							addressData?.tokens.map((item: any) => {
								if (item.name === token) {
									onClick(item);
									addFilter(item);
									navigate(`/addresses/${address}/ERC-20_Tx/${item.idx}`);
								}
							});
						}}
					>
						{token}
					</div>
				)}
			</div>
		) : null;

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
