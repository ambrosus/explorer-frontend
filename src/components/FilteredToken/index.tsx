import React from 'react';
import Eth from '../../assets/icons/Cryptos/Eth';
import Discard from '../../assets/icons/Discard';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { shallowEqual } from 'react-redux';
import { useActions } from '../../hooks/useActions';
import { useNavigate, useParams } from 'react-router-dom';

const FilteredToken = ({selectedToken,setSelectedToken}:any) => {
	const {clearFilters} = useActions();
	const { address } = useParams();
	const navigate = useNavigate();
	const { filters } = useTypedSelector((state: any) => state.tokenFilters);
	const { data: appData } = useTypedSelector((state: any) => state.app);

	const backClick = () => console.log('backCLick');

	const discardClick = () => {
		setSelectedToken(null);
		clearFilters();
		navigate(`/addresses/${address}/ERC-20_Tx`)
	}

	return (
		<div className='filteredToken'>
			<div className='filteredToken__head'>
				<div className='filteredToken__cells'>
					<div className='filteredToken__cell filteredToken__heading'>Filtered by token</div>
					<div className='filteredToken__cell'>
						<Eth />
						{filters && filters.name}
					</div>
				</div>
				<div className='filteredToken__cells'>
					<div className='filteredToken__cell'>
						<button onClick={backClick}>Back to all tokens</button>
					</div>

					<button className='filteredToken__cell' onClick={discardClick}>
						<Discard />
					</button>
				</div>
			</div>
			<div className='filteredToken__body'>
				<div className='filteredToken__cell'>
					<span className='filteredToken__cell-bold'>Balance</span>
					<span className='filteredToken__cell-normal'>{filters.balance}/ $ {appData && appData?.total_price_usd && appData.total_price_usd ? Number(filters.balance * appData.total_price_usd).toFixed(2):'no course'}</span>
				</div>
				<div className='filteredToken__cell'>
					<span className='filteredToken__cell-bold'>Price</span>
					<span className='filteredToken__cell-normal'>n `Symbol` / $ n</span>
				</div>
				<div className='filteredToken__cell'>
					<span className='filteredToken__cell-bold'>Total supply</span>
					<span className='filteredToken__cell-normal'>{Number(filters.totalSupply).toFixed(2)}</span>
				</div>
				<div className='filteredToken__cell'>
					<span className='filteredToken__cell-bold'>Market cap</span>
					<span className='filteredToken__cell-normal'>$n</span>
				</div>
				<div className='filteredToken__cell'>
					<span className='filteredToken__cell-bold'>Total transfers</span>
					<span className='filteredToken__cell-normal'>n</span>
				</div>
			</div>
		</div>
	);
};

export default FilteredToken;
