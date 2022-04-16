import React, { ChangeEvent, useState } from 'react';
import TokenItem from '../TokenItem';
import { useTypedSelector } from '../../hooks/useTypedSelector';

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
							<span className='universall__light2' style={{ marginLeft: 4 }}>
								{'>'}20
							</span>
						</div>
						<div className='tokenModal__arrows'></div>
					</div>
					{tokens.map((token: any) => (
						<div
							onClick={() => {
								setToken(token);
							}}
							key={token.name + token.idx}
						>
							<TokenItem selectedToken={selectedToken} token={token} />
						</div>
					))}
				</>
			)}
		</div>
	);
};

export default TokenModal;
