import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Find from '../../components/Find';
import FindWide from '../../components/FindWide';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

import { routes as menuItems } from '../../routes';
import AmbrosusLogoSvg from './AmbrosusLogoSvg';
import { IRoute } from '../../types';

const menu = menuItems.map((menuElement:IRoute) => (
	<NavLink to={menuElement.path} key={menuElement.key} className='menu__item'>
		{menuElement.key}
	</NavLink>
));

export const Header = () => {
	const [isShow, setIsShow] = useState<boolean>(false);
	const searchRef  = useRef(null);

	useOnClickOutside(searchRef, () => setIsShow(false));

	return (
		<div className='header'>
			<div className='container'>
				<nav className='navigation'>
					<div className='logo'>
						<NavLink to='/'>
							<AmbrosusLogoSvg />
						</NavLink>
					</div>

					{isShow ? (
						<FindWide searchRef={searchRef} />
					) : (
						<div className='menu'>
							{menu}
							<Find setIsShow={setIsShow} />
						</div>
					)}
				</nav>
			</div>
		</div>
	);
};
