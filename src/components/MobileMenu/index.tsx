import { useOnClickOutside } from 'hooks/useOnClickOutside'
import React, { useRef, useState } from 'react'

import BurgerMenuClose from '../../assets/icons/MobileMenu/BurgerMenuClose'
import BurgerMenuOpen from '../../assets/icons/MobileMenu/BurgerMenuOpen'
import FindWideMobile from '../../components/FindWideMobile'

interface MobileMenuProps {
	menu: any
}
const MobileMenu: React.FC<MobileMenuProps> = ({ menu }) => {
	const [isShow, setIsShow] = useState(false)
	const menuRef = useRef(null)

	useOnClickOutside(menuRef, () => setIsShow(false))

	return (
		<>
			<div ref={menuRef} className="mobile">
				<button onClick={() => setIsShow(!isShow)} className="menu__btn">
					{isShow ? <BurgerMenuClose /> : <BurgerMenuOpen />}
				</button>
				{isShow && (
					<div className="menuMobile">
						<span style={{ backgroundColor: '#212121' }}>
							<FindWideMobile />
						</span>
						{menu}
					</div>
				)}
			</div>
		</>
	)
}

export default MobileMenu
