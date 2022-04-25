import React, { useRef, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import ArrowDown from '../../assets/icons/Arrows/ArrowDown';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { TParams } from '../../types';

interface AddressBlockProps {
	txhash: string | number;
	method: string | number;
	from: string | number;
	to: string | number;
	date: string | number;
	block: string | number;
	amount: any;
	txfee: string | number;
	token: string;
	methodFilters: any;
	setTransactionType?: any;
}

const AddressBlock: React.FC<AddressBlockProps> = ({
	txhash,
	method,
	from,
	to,
	date,
	block,
	amount,
	txfee,
	token,
	methodFilters,
	setTransactionType,
}) => {
	const [isShow, setIsShow] = useState(false);
	const { address }: TParams = useParams();
	const methodRef: any = useRef();

	useOnClickOutside(methodRef, () => setIsShow(false));

	const isTxHash = txhash === null ? null : <div className='addressDetails__thead-td'>{txhash}</div>;
	const isMethod =
		method === null ? null : (
			<div ref={methodRef} className='addressDetails__thead-td'>
				<button
					className=' universall__light2'
					style={{ display: 'flex', alignItems: 'center', fontWeight: 700, fontSize: '0.86rem', lineHeight: '1.77em' }}
					onClick={() => setIsShow(true)}
				>
					{method}
					<ArrowDown />
				</button>
				<div ref={methodRef} className='methodModal__table'>
					{isShow &&
						methodFilters.map((filter: { title: string; value: any }) => (
							<NavLink
								key={filter.title}
								to={`/addresses/${address}/${filter.value}`}
								tabIndex={-1}
								className='methodModal__link'
								onClick={() => setTransactionType(filter.value)}
							>
								{filter.title}
							</NavLink>
						))}
				</div>
			</div>
		);
	const isFrom = from === null ? null : <div className='addressDetails__thead-td'>{from}</div>;
	const isTo = to === null ? null : <div className='addressDetails__thead-td'>{to}</div>;
	const isDate = date === null ? null : <div className='addressDetails__thead-td'>{date}</div>;
	const isBlock = block === null ? null : <div className='addressDetails__thead-td'>{block}</div>;
	const isAmount = amount === null ? null : <div className='addressDetails__thead-td'>{amount}</div>;
	const isTxFee = txfee === null ? null : <div className='addressDetails__thead-td'>{txfee}</div>;
	const isToken = token === null ? null : <div className='addressDetails__thead-td'>{token[0].toUpperCase() + token.slice(1)}</div>;

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
