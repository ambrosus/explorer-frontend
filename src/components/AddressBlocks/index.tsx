import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Eth from '../../assets/icons/Cryptos/Eth';
import GreenCircle from '../../assets/icons/GreenCircle';
import OrangeCircle from '../../assets/icons/OrangeCircle';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

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
	isLatest?: boolean;
	onClick?: any;
};

const AddressBlock: React.FC<AddressBlockProps> = ({onClick,isLatest, txhash, method, from, to, date, block, amount, txfee, token }) => {
	const online: any = txfee === 'Pending' ? <OrangeCircle /> : <GreenCircle />;
	const {addFilter} = useActions();
	const {
		data: addressData,
	} = useTypedSelector((state: any) => state.position);
	const { type } = useParams();

	const isTxHash = txhash === null ? null : <div className='addressDetails__tbody-td universall__light2'>{txhash}</div>;
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

	const isToken: any = type === 'ERC-20_Tx'
		? <div className='addressDetails__tbody-td'>
		{!isLatest ?token : <div
			onClick={()=>{
			addressData?.tokens.map((item: any,index:number)=>{
				if(item.name === token){
					const searchParam =  token.filterName === 'All' || token.filterName === 'inputs' || token.filterName === 'outputs' || token.filterName === '0' ? token.filterName: index-3
					addFilter({...item, name:item.name, filterName: searchParam});
					onClick({...item, name:item.name, filterName: searchParam})
				}
			})

		}}
		>{token}</div>}</div>
		: null;

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
