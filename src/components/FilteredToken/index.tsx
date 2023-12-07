import { ReactComponent as AddIcon } from '../../assets/svg/add.svg';
import { poolsTokens } from '../../utils/constants';
import { getTokenIcon } from '../../utils/helpers';
// @ts-ignore
import { Button } from '@airdao/ui-library';
import { useWeb3React } from '@web3-react/core';
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
  const { provider, isActive } = useWeb3React();

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
    if (poolsTokens[selectedToken.address]) {
      return poolsTokens[selectedToken.address].name;
    } else {
      return selectedToken.name;
    }
  }, [selectedToken]);

  const addToWallet = async () => {
    if (provider && provider.provider) {
      provider.provider.request?.({
        method: 'wallet_watchAsset',
        params: {
          // @ts-ignore
          type: 'ERC20',
          options: {
            address: selectedToken.address, // The address of the token.
            symbol: selectedToken.symbol, // A ticker symbol or shorthand, up to 5 characters.
            decimals: selectedToken.decimals, // The number of decimals in the token.
            image: `${window.location.origin}/explorer/token-icons/${selectedToken.symbol}.svg`, // A string URL of the token logo.
          },
        },
      });
    }
  };

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
            {isActive && selectedToken.symbol && (
              <Button
                onClick={addToWallet}
                type={'tetiary'}
                size={'small'}
                tailIcon={<AddIcon />}
              >
                Add in Metamask
              </Button>
            )}
          </div>
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
