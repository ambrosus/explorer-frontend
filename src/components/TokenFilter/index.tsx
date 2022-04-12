import React, { useRef, useState } from 'react';
import ArrowDownBig from '../../assets/icons/Arrows/ArrowDownBig';
import TokenModal from '../TokenModal';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

const TokenFilter = ({ onClick }: React.SetStateAction<any>) => {
	const { addFilter, removeFilter } = useActions();
	const { filters } = useTypedSelector((state: any) => state.tokenFilters);

	const [isShow, setIsShow] = useState(false);

	const handleSubmit = (e: any) => {
		e.preventDefault();
	};

	const toggleMenu = () => setIsShow(!isShow);

	const refTokensModal = useRef(null);

	useOnClickOutside(refTokensModal, () => setIsShow(false));

	const handleSelect = (token: { contract: string }) => {
		onClick(token);
		!filters.includes(token) ? addFilter(token) : removeFilter(token);
	};

	return (
		<>
			<div ref={refTokensModal} tabIndex={0} className='tokenFilter' onSubmit={handleSubmit}>
				<div className='tokenFilter__input'>
					<span className='tokenFilter__input-rectangle'>{filters.length}</span>
					<span className='tokenFilter__input-text'>{`> $ 152.35 USD`}</span>
					<button className='tokenFilter__input-btn' type='button' onClick={toggleMenu}>
						<ArrowDownBig />
					</button>
				</div>
				{isShow && <TokenModal setToken={handleSelect} />}
			</div>
		</>
	);
};

export default TokenFilter;
