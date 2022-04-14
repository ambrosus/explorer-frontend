import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ArrowDown from '../../assets/icons/Arrows/ArrowDown';

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
	const { address } = useParams();

	const sortMethod = () => setIsShow(!isShow);

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
				<div className='methodModal__table'>
					{isShow &&
						methodFilters.map((filter: { title: string; value: any }) => (
							<Link
								key={filter.title}
								to={`/addresses/${address}/${filter.value}`}
								tabIndex={-1}
								className='methodModal__link'
								onClick={() => setTransactionType(filter.value)}
							>
								{filter.title}
							</Link>
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
