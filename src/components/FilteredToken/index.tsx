import { getTokenIcon } from '../../utils/helpers';
import Discard from 'assets/icons/Discard';
import { useActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';
import React, { FC } from 'react';
import {formatEther} from "ethers/lib/utils";

export type FilteredTokenProps = {
  setSelectedToken: any;
  selectedToken: any;
};

const FilteredToken: FC<FilteredTokenProps> = ({ setSelectedToken, selectedToken }) => {
  const { clearFilters } = useActions();
  const { filters } = useTypedSelector((state: any) => state.tokenFilters);

  const backClick = () => {
    setSelectedToken(null);
    clearFilters();
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
            {selectedToken && selectedToken.name}
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
      <div className="filtered_token_body">
        <div className="filtered_token_cell">
          <span className="filtered_token_cell_bold">Balance</span>
          <span className="filtered_token_cell_normal">
            {selectedToken.balance ? Number(selectedToken.balance).toFixed(2) : '-'}
          </span>
        </div>

        <div className="filtered_token_cell">
          <span className="filtered_token_cell_bold">Total supply</span>
          <span className="filtered_token_cell_normal">
            {Number(formatEther(selectedToken.total.wei)).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FilteredToken;
