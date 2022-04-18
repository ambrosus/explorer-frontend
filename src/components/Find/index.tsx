import React, { useEffect } from 'react';
import Search from '../../assets/icons/Search';

type FindProps = {
	setIsShow: any;
};

const Find: React.FC<FindProps> = ({ setIsShow }) => {
	return (
		<>
			<button className='navigation__search' onClick={() => setIsShow(true)}>
				<Search fill={'#fff'} />
			</button>
		</>
	);
};

export default Find;
