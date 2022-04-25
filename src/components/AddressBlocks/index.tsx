import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Amb from '../../assets/icons/Cryptos/Amb';

import GreenCircle from '../../assets/icons/GreenCircle';
import OrangeCircle from '../../assets/icons/OrangeCircle';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { sliceData10 } from '../../utils/helpers';
import { TParams } from '../../types';
import { AddressBlockProps } from '../../pages/Addresses/AddressDetails/types';

const AddressBlock: React.FC<AddressBlockProps> = ({ onClick, isLatest, txhash, method, from, to, date, block, amount, txfee, token }) => {
	const online: any = txfee === 'Pending' ? <OrangeCircle /> : <GreenCircle />;
	const { addFilter } = useActions();
	const navigate = useNavigate();
	const { address }: TParams = useParams();
	const { data: addressData } = useTypedSelector((state: any) => state.position);
	const { type } : TParams= useParams();

	const isTxHash : JSX.Element | null =
		txhash === null ? null : (
			<div className='addressDetails__tbody-td universall__light2' style={{ fontWeight: '600' }}>
				{sliceData10(txhash as string)}
			</div>
		);
	const isMethod = method === null ? null : <div className='addressDetails__tbody-td'>{method}</div>;
	const isFrom = from === null ? null : <div className='addressDetails__tbody-td universall__light2'>{from}</div>;
	const isTo = to === null ? null : <div className='addressDetails__tbody-td universall__light2'>{to}</div>;
	const isDate = date === null ? null : <div className='addressDetails__tbody-td'>{date}</div>;
	const isBlock: any = type === 'ERC-20_Tx' ? null : <div className='addressDetails__tbody-td'>{block}</div>;
	const isAmount =
		amount === null ? null : (
			<div className='addressDetails__tbody-td'>
				<span className='universall__indent-icon'>
					<Amb />
				</span>
				{amount}
				{token && token!== 'No token'? (
						<div
							style={{padding:"0 5px",cursor:"pointer",color:"#808a9d"}}
							onClick={() => {
								// eslint-disable-next-line array-callback-return
								addressData?.tokens.forEach((item: any) => {
									console.log('item',item);
									if (item.name === token) {
										onClick(item);
										addFilter(item);
										navigate(`/addresses/${address}/ERC-20_Tx/${item.idx}`);
									}else {
										return '';
									}
								});
							}}
						>
							{// @ts-ignore
								token ? token?.slice(0, 8) : ''}
						</div>
					)
					: (<div
						style={{padding:"0 5px",color:"#808a9d"}}
					>No token</div> )}
			</div>
		);

	const isTxFee: any =
		type === 'ERC-20_Tx' ? null : (
			<div className='addressDetails__tbody-td' style={{ padding: 0 }}>
				<span className='universall__indent-icon' style={{ display: 'flex', alignItems: 'center' }}>
					{online}
				</span>
				{txfee }
			</div>
		);

	const isToken: any =
		type === 'ERC-20_Tx' ? (
			<div className='addressDetails__tbody-td universall__light2' style={{ fontWeight: '600' }}>
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
