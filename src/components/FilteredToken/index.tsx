import { getTokenIcon } from '../../utils/helpers';
import Discard from 'assets/icons/Discard';
import { formatEther } from 'ethers/lib/utils';
import { useActions } from 'hooks/useActions';
import React, { FC, useMemo } from 'react';

export type FilteredTokenProps = {
  setSelectedToken: any;
  selectedToken: any;
};

const FilteredToken: FC<FilteredTokenProps> = ({
  setSelectedToken,
  selectedToken,
}) => {
  const { clearFilters } = useActions();

  const backClick = () => {
    setSelectedToken(null);
    clearFilters();
  };
  const Icon = getTokenIcon(
    selectedToken.symbol as string,
    selectedToken.name,
    selectedToken.address,
  );

  const _name = useMemo(() => {
    if (
      selectedToken.address === '0x322269e52800e5094c008f3b01A3FD97BB3C8f5D'
    ) {
      return 'Hera Pool Token';
    } else if (
      selectedToken.address === '0x7240d2444151d9A8c72F77306Fa10f19FE7C9182'
    ) {
      return 'Test1 pool token';
    } else if (
      selectedToken.address === '0xEB8386a50Edd613cc43f061E9C5A915b0443C5d4'
    ) {
      return 'Plutus pool token';
    } else if (
      selectedToken.address === '0xE984ACe36F2B6f10Fec8dd6fc1bB19c7b1D2F2c6'
    ) {
      return 'Ganymede pool token';
    } else {
      return selectedToken.name;
    }
  }, [selectedToken]);

  return (
    <div className="filtered_token">
      <div className="filtered_token_head">
        <div className="filtered_token_cells">
          <div className="filtered_token_cell filtered_token_heading">
            Filtered by token
          </div>
          <div className="filtered_token_cell">
            <Icon />
            {selectedToken && _name}
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
            {selectedToken.balance.ether
              ? selectedToken.balance.ether.toFixed(2)
              : '-'}
          </span>
        </div>
        <div className="filtered_token_cell">
          <span className="filtered_token_cell_bold">Total supply</span>
          <span className="filtered_token_cell_normal">
            {(+formatEther(selectedToken.totalSupply.wei)).toFixed(2)}
          </span>
        </div>
        <div className="filtered_token_cell">
          <span className="filtered_token_cell_bold">
            Token contract address
          </span>
          <span className="filtered_token_cell_normal">
            {selectedToken.address}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FilteredToken;
