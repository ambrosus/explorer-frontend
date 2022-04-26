import React from 'react'
import useWindowSize from '../../hooks/useWindowSize'

import { NavLink } from 'react-router-dom'

import { routes as menuItems } from '../../routes'
import { IRoute } from '../../types'

import AmbrosusLogoSvg from './AmbrosusLogoSvg'
import DesctopMenu from '../../components/DesctopMenu'
import MobileMenu from '../../components/MobileMenu'

const menu = menuItems.map((menuElement: IRoute) => (
	<NavLink to={menuElement.path} key={menuElement.key} className="menu__item">
		{menuElement.key}
	</NavLink>
))

export const Header = () => {
	const { width } = useWindowSize()
	console.log(width)

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
						<MobileMenu menu={menu} />
					) : (
						<DesctopMenu menu={menu} />
					)}
				</nav>
			</div>
		</div>
	)
}
