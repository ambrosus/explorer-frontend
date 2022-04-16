import React, { useRef, useState } from 'react';
import ArrowDownBig from '../../assets/icons/Arrows/ArrowDownBig';
import TokenModal from '../TokenModal';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { useNavigate, useParams } from 'react-router-dom';

const TokenFilter= ({onClick,selectedToken}:any) => {
	const {addFilter} = useActions();
	const {data : addressData} = useTypedSelector((state: any) => state.position)
	const [isShow, setIsShow] = useState(false);
	const navigate = useNavigate();
	const { address, type ,filtered}: any = useParams();
	const refTokensModal = useRef(null);

	useOnClickOutside(refTokensModal, () => setIsShow(false));

	const toggleMenu = () => setIsShow(!isShow);

	const handleSelect = (token: any) => {
		onClick(token);
			addFilter(token)
			navigate(`/addresses/${address}/ERC-20_Tx/${token.idx ? token.idx : ''}`)
	};

	return (
		<>
			<div ref={refTokensModal}
					 tabIndex={0}
					 className='tokenFilter'
					 >
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
