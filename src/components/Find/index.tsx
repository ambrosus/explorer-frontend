import React, { useEffect } from 'react';
import Search from '../../assets/icons/Search';

// FindProps interface
interface FindProps {
	setIsShow: (value: boolean) => void;
}
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
