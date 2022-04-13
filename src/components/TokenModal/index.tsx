import React, { ChangeEvent, useState } from 'react';
import TokenItem from '../TokenItem';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Loader from '../Loader';
import { useActions } from '../../hooks/useActions';

type TokenModalProps = {
	setToken: any;
};

const TokenModal: React.FC<TokenModalProps> = ({ setToken }) => {
	const [name, setName] = useState('');
	const {addFilter,removeFilter} = useActions();
	const {data : addressData} = useTypedSelector((state: any) => state.position)
	const {tokens} = addressData

	const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setName(e.target.value);
		tokens.map((token: any) => {
			if (token.name.includes(e.target.value)) {
				addFilter(token);
			}else{
				removeFilter(token);
			}
		});
	};

	return (
		<div className='tokenModal'
				 tabIndex={0}
		>
			<input
				className='tokenModal__search'
				placeholder='Search for Token Name'
				type='text' value={name}
				onChange={changeInput} />
			{tokens ?
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
				{tokens.map((token:any)=><div
					onClick={()=>setToken(token)}
					key={token.contract}>
					<TokenItem setToken={setToken} token={token} />
				</div>)}

			</>
			:<Loader/>}

		</div>
	);
};

export default TokenModal;
