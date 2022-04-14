import React, { useRef, useState } from 'react';
import ArrowDownBig from '../../assets/icons/Arrows/ArrowDownBig';
import TokenModal from '../TokenModal';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

const TokenFilter= ({onClick,selectedToken}:any) => {
	const {addFilter, removeFilter} = useActions();
	const {data : addressData} = useTypedSelector((state: any) => state.position)
	const [isShow, setIsShow] = useState(false);

	const handleSubmit = (e: any) => {
		e.preventDefault();
	};

	const toggleMenu = () => setIsShow(!isShow);

	const refTokensModal = useRef(null);

	useOnClickOutside(refTokensModal, () => setIsShow(false));

	const handleSelect = (token: any) => {
		const newToken = {name: token.name, filterName: token.filterName}
		onClick(newToken);
		if (addressData && addressData.tokens){
			console.log('addressData.tokens', addressData.tokens);
			addFilter(newToken)
		}
	};

	return (
		<>
			<div ref={refTokensModal}
					 tabIndex={0}
					 className='tokenFilter' onSubmit={handleSubmit}>
				<div className='tokenFilter__input'>
					<span className='tokenFilter__input-rectangle'>{addressData && addressData.tokens && addressData.tokens.length}</span>
					<span className='tokenFilter__input-text'>{`> $ 152.35 USD`}</span>
					<button className='tokenFilter__input-btn' type='button' onClick={toggleMenu}>
						<ArrowDownBig />
					</button>
				</div>
				{isShow && <TokenModal selectedToken={selectedToken} setToken={handleSelect}  />}
			</div>
		</>
	);
};

export default TokenFilter;
