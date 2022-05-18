import DesctopMenu from 'components/DesctopMenu'
import MobileMenu from 'components/MobileMenu'
import useWindowSize from 'hooks/useWindowSize'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { routes as menuItems } from 'routes'
import { IRoute } from 'types'

import AmbrosusLogoSvg from './AmbrosusLogoSvg'

export const Header = () => {
	const { width } = useWindowSize()
	const [isShow, setIsShow] = useState(false)

	const isMobileStyle = width > 1100 ? 'menu__item' : 'menuMobile__item'

	const menu = menuItems.map((menuElement: IRoute) => {
		const cursor = menuElement.isClick ? 'universall__hover' : ''
		const activeStyle = {
			color: '#fff',
			cursor: cursor,
		}
		const disableClick = (e: any) => {
			!menuElement.isClick && e.preventDefault()
			menuElement.isClick && setIsShow(false)
		}

		return (
			<NavLink
				to={menuElement.path}
				key={menuElement.key}
				className={`${isMobileStyle} ${cursor}`}
				style={({ isActive }) => ({
					...(isActive ? activeStyle : null),
				})}
				onClick={disableClick}
			>
				{menuElement.key}
			</NavLink>
		)
	})

	return (
		<div className="header">
			<div className="container">
				<nav className="navigation">
					<div className="logo">
						<NavLink to="/">
							<AmbrosusLogoSvg />
						</NavLink>
					</div>
					{width > 1108 ? (
						<DesctopMenu menu={menu} />
					) : (
						<MobileMenu menu={menu} setIsShow={setIsShow} isShow={isShow} />
					)}
				</nav>
			</div>
		</div>
	)
}
/*need jsDoc for Header function
 * @param {IRoute[]} menuItems
 * @param {boolean} isMobile
 * @param {boolean} isDesctop
 * @param {boolean} isOpen
 * @param {() => void} toggleMenu
 * @param {() => void} closeMenu
 * @param {() => void} openMenu
 * @returns {JSX.Element}
 */
