import React, { useEffect } from 'react';
import Eth from '../../assets/icons/Cryptos/Eth';
import { ethers, providers } from 'ethers';
import erc20Abi from '../../utils/abis/ERC20.json';
import { ethereum } from '../../utils/constants';
import { formatEther } from 'ethers/lib/utils';
import { useParams } from 'react-router-dom';

type TokenItemProps = {
	token: any;
	selectedToken:any
};

const TokenItem = ({token,selectedToken}:TokenItemProps) => (
		<div className='tokenItem'
				 tabIndex={0}
			// @ts-ignore
				 style={{backgroundColor : selectedToken && selectedToken?.name && selectedToken?.name === token?.name ? '#EFF2F5':'#fff'}}>
			<div className='tokenItem__icon'>
				<Eth />
			</div>
			<div className='tokenItem__tokens'>
				<div>
					{token?.name?.length > 13
						? `${token?.name.slice(0, 11)}...`
						: token?.name}</div>
				<div className='universall__light2'>1 AMB</div>
			</div>
			<div className='tokenItem__amount'>
				<div>{token?.balance }</div>
				<div className='universall__light2 universall__line-height'>@0.00</div>
			</div>
		</div>
	);

export default TokenItem;
