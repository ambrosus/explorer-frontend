import React from 'react'
import { NavLink } from 'react-router-dom'

import DesctopMenu from '../../components/DesctopMenu'
import MobileMenu from '../../components/MobileMenu'
import useWindowSize from '../../hooks/useWindowSize'
import { routes as menuItems } from '../../routes'
import { IRoute } from '../../types'

import AmbrosusLogoSvg from './AmbrosusLogoSvg'

export const Header = () => {
	const { width } = useWindowSize()

	const menu = menuItems.map((menuElement: IRoute) => (
		<NavLink
			to={menuElement.path}
			key={menuElement.key}
			className={width > 1100 ? 'menu__item' : 'menuMobile__item'}
		>
			{menuElement.key}
		</NavLink>
	))

	return (
		<div className="header">
			<div className="container">
				<nav className="navigation">
					<div className="logo">
						<NavLink to="/">
							<AmbrosusLogoSvg />
						</NavLink>
					</div>
					{width > 1100 ? (
						<DesctopMenu menu={menu} />
					) : (
						<MobileMenu menu={menu} />
					)}
				</nav>
			</div>
		</div>
	)
}
