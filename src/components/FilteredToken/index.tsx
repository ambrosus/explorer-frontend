import React from 'react';
import Eth from '../../assets/icons/Cryptos/Eth';
import Discard from '../../assets/icons/Discard';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { shallowEqual } from 'react-redux';
import { useActions } from '../../hooks/useActions';

const FilteredToken = ({selectedToken,setSelectedToken}:any) => {
	const {clearFilters} = useActions();

	const backClick = () => console.log('backCLick');
	const discardClick = () => {
		setSelectedToken(null);
		clearFilters(selectedToken);
	}
	const { filters } = useTypedSelector((state: any) => state.tokenFilters, shallowEqual);
	console.log('filters', filters);
	console.log('selectedToken', selectedToken);
	return (
		<div className='filteredToken'>
			<div className='filteredToken__head'>
				<div className='filteredToken__cells'>
					<div className='filteredToken__cell filteredToken__heading'>Filtered by token</div>
					<div className='filteredToken__cell'>
						<Eth />
						{selectedToken.name}
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
					<span className='filteredToken__cell-normal'>1,286.35 ACC / $ 205.6118</span>
				</div>
				<div className='filteredToken__cell'>
					<span className='filteredToken__cell-bold'>Price</span>
					<span className='filteredToken__cell-normal'>1 ACC / $0.0000001556</span>
				</div>
				<div className='filteredToken__cell'>
					<span className='filteredToken__cell-bold'>Total supply</span>
					<span className='filteredToken__cell-normal'>361,477,437.53570140</span>
				</div>
				<div className='filteredToken__cell'>
					<span className='filteredToken__cell-bold'>Market cap</span>
					<span className='filteredToken__cell-normal'>$5,616,448.029...</span>
				</div>
				<div className='filteredToken__cell'>
					<span className='filteredToken__cell-bold'>Total transfers</span>
					<span className='filteredToken__cell-normal'>466,238</span>
				</div>
			</div>
		</div>
	);
};

export default FilteredToken;
