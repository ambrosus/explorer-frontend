import React, { ChangeEvent, useEffect, useState } from 'react';
import TokenItem from '../TokenItem';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { ethers, providers } from 'ethers';
import erc20Abi from '../../utils/abis/ERC20.json';
import { ethereum } from '../../utils/constants';
import { formatEther } from 'ethers/lib/utils';
import { NavLink, useParams } from 'react-router-dom';

type TokenModalProps = {
	setToken: any;
	selectedToken: any;
};

const TokenModal: React.FC<TokenModalProps> = ({ selectedToken, setToken }) => {
	const [name, setName] = useState('');
	const { data: addressData } = useTypedSelector((state: any) => state.position);
	const { tokens } = addressData;

	const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setName(e.target.value);
	};

	return (
		<div className='tokenModal' tabIndex={0}>
			<input className='tokenModal__search' placeholder='Search for Token Name' type='text' value={name} onChange={changeInput} />
			{addressData && tokens && (
				<>
					<div>
						<div className='tokenModal__tokens'>
							ERC-20 Tokens
							<span className='universall__light2' style={{ marginLeft: 4 }}></span>
						</div>
						<div className='tokenModal__arrows'></div>
					</div>
					{tokens.map((token: any) => {
						return <TokenItem key={token.name + token.idx} selectedToken={selectedToken} token={token} setToken={setToken} />;
					})}
				</>
			)}
		</div>
	);
};

export default TokenModal;
