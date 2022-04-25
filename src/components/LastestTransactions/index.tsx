import React from 'react';
import GreenCircle from '../../assets/icons/StatusAction/GreenCircle';
import OrangeCircle from '../../assets/icons/StatusAction/OrangeCircle';
import { sliceData5, calcTime } from '../../utils/helpers';

type lastestTransactionsProps = {
	hash: any;
	status: string;
	timestamp: number;
	from: string;
	to: string;
	amount: number;
	type?: any | Element | null | false;
};

const LatestTransactions: React.FC<lastestTransactionsProps> = ({ hash, status, timestamp, from, to, amount, type }) => {
	const isOnline = (status: string) => {
		switch (status) {
			case 'SUCCESS':
				return <GreenCircle />;

			case 'PENDING':
				return <OrangeCircle />;
			default:
				return null;
		}
	};

	return (
		<>
			<div className='lastestTransactions__cells'>
				<div className='lastestTransactions__cell'>
					<div className='lastestTransactions__cell-content lastestTransactions__font-big'>
						<span>{isOnline(status)}</span>
						{sliceData5(hash)}
					</div>

					<div className='lastestTransactions__p lastestTransactions__font-small'>{calcTime(timestamp)}</div>
				</div>

				<div className='lastestTransactions__cell'>
					<div className='lastestTransactions__cell-content'>
						<div className='lastestTransactions__font-small'>From</div>
						<div className='lastestTransactions__font-big lastestTransactions__margin-left'>{sliceData5(from)}</div>
					</div>
					<div className='lastestTransactions__cell-content'>
						<div className='lastestTransactions__font-small'>To</div>
						<div className='lastestTransactions__font-big lastestTransactions__margin-left'>{sliceData5(to)}</div>
					</div>
				</div>
				<div className='lastestTransactions__cell'>
					<div className='lastestTransactions__cell-content lastestTransactions__font-small'>{type}</div>
					<div className='lastestTransactions__cell-content lastestTransactions__font-big'>{`${amount.toFixed(5)} AMB`}</div>
				</div>
			</div>
		</>
	);
};

export default LatestTransactions;
