import { TParams } from '../../types';
import { getTokenIcon } from '../../utils/helpers';
import Discard from 'assets/icons/Discard';
import { useActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { TokenType } from 'pages/Addresses/AddressDetails/address-details.interface';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export type FilteredTokenProps = {
  setSelectedToken: (token: TokenType | null) => void;
};

let filtersBuffer: any = {
  name: '',
  balance: 0,
  totalSupply: 0,
};

const FilteredToken: FC<FilteredTokenProps> = ({ setSelectedToken }) => {
  const { clearFilters } = useActions();
  const [filter, setFilter] = useState(filtersBuffer);
  const { address }: TParams = useParams();
  const navigate = useNavigate();
  const { filters } = useTypedSelector((state: any) => state.tokenFilters);

  useEffect(() => {
    //TODO !filtersBuffer
    if (filtersBuffer !== undefined && filtersBuffer !== null) {
      filtersBuffer = filters;
      setFilter(filters);
    }
    filtersBuffer = filters;
  }, [filters]);
  const backClick = () => {
    setSelectedToken(null);
    clearFilters();
    navigate(`/addresses/${address}/ERC-20_Tx/`);
  };
  const Icon = getTokenIcon(filters.symbol as string);

  return (
    <div className="filtered_token">
      <div className="filtered_token_head">
        <div className="filtered_token_cells">
          <div className="filtered_token_cell filtered_token_heading">
            Filtered by token
          </div>
          <div className="filtered_token_cell">
            <Icon />
            {filter && filter.name}
          </div>
        </div>
        <div className="filtered_token_cells">
          <div className="filtered_token_cell">
            <button onClick={backClick}>Back to all tokens</button>
          </div>

          <button className="filtered_token_cell" onClick={backClick}>
            <Discard />
          </button>
        </div>
      </div>
      {filter?.balance && (
        <div className="filtered_token_body">
          <div className="filtered_token_cell">
            <span className="filtered_token_cell_bold">Balance</span>
            <span className="filtered_token_cell_normal">
              {filter.balance ? Number(filter.balance).toFixed(2) : '-'}
            </span>
          </div>

          <div className="filtered_token_cell">
            <span className="filtered_token_cell_bold">Total supply</span>
            <span className="filtered_token_cell_normal">
              {filter.totalSupply ? Number(filter.totalSupply).toFixed(2) : '-'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilteredToken;
