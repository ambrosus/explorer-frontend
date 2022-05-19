import { TParams } from '../../types';
import { getTokenIcon } from '../../utils/helpers';
import Eth from 'assets/icons/Cryptos/Eth';
import Discard from 'assets/icons/Discard';
import { useActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { TokenType } from 'pages/Addresses/AddressDetails/address-details.interface';
import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export type FilteredTokenProps = {
  setSelectedToken: (token: TokenType | null) => void;
};
const FilteredToken: FC<FilteredTokenProps> = ({ setSelectedToken }) => {
  const { clearFilters } = useActions();
  const { address }: TParams = useParams();
  const navigate = useNavigate();
  const { filters } = useTypedSelector((state: any) => state.tokenFilters);

  const backClick = () => {
    setSelectedToken(null);
    clearFilters();
    navigate(`/addresses/${address}/ERC-20_Tx/`);
  };
  const Icon = getTokenIcon(filters.symbol as string);

  return (
    <div className="filteredToken">
      <div className="filteredToken__head">
        <div className="filteredToken__cells">
          <div className="filteredToken__cell filteredToken__heading">
            Filtered by token
          </div>
          <div className="filteredToken__cell">
            <Icon />
            {filters && filters.name}
          </div>
        </div>
        <div className="filteredToken__cells">
          <div className="filteredToken__cell">
            <button onClick={backClick}>Back to all tokens</button>
          </div>

          <button className="filteredToken__cell" onClick={backClick}>
            <Discard />
          </button>
        </div>
      </div>
      {filters?.balance && (
        <div className="filteredToken__body">
          <div className="filteredToken__cell">
            <span className="filteredToken__cell-bold">Balance</span>
            <span className="filteredToken__cell-normal">
              {filters.balance ? Number(filters.balance).toFixed(2) : '-'}
            </span>
            {/*
						// TODO make it work when backend is ready
						<span className='filteredToken__cell-normal'>{filters.balance}/ $ {appData && appData?.total_price_usd && appData.total_price_usd ? Number(filters.balance * appData.total_price_usd).toFixed(2):'no course'}</span>
						*/}
          </div>
          {/*<div className='filteredToken__cell'>*/}
          {/*	<span className='filteredToken__cell-bold'>Price</span>*/}
          {/*	<span className='filteredToken__cell-normal'>n `Symbol` / $ n</span>*/}
          {/*</div>*/}
          <div className="filteredToken__cell">
            <span className="filteredToken__cell-bold">Total supply</span>
            <span className="filteredToken__cell-normal">
              {filters.totalSupply
                ? Number(filters.totalSupply).toFixed(2)
                : '-'}
            </span>
          </div>
          {/*<div className='filteredToken__cell'>*/}
          {/*	<span className='filteredToken__cell-bold'>Market cap</span>*/}
          {/*	<span className='filteredToken__cell-normal'>$n</span>*/}
          {/*</div>*/}
          {/*<div className='filteredToken__cell'>*/}
          {/*	<span className='filteredToken__cell-bold'>Total transfers</span>*/}
          {/*	<span className='filteredToken__cell-normal'>n</span>*/}
          {/*</div>*/}
        </div>
      )}
    </div>
  );
};

export default FilteredToken;
