import React, { useState } from 'react'
import BurgerMenuOpen from '../../assets/icons/MobileMenu/BurgerMenuOpen'
import BurgerMenuClose from '../../assets/icons/MobileMenu/BurgerMenuClose'

interface MobileMenuProps {
	menu: any
}
const MobileMenu: React.FC<MobileMenuProps> = ({ menu }) => {
	const [isShow, setIsShow] = useState(false)
	return (
		<>
			<div className="menu">
				{isShow && menu}
				<button onClick={() => setIsShow(!isShow)} className="menu__btn">
					{isShow ? <BurgerMenuClose /> : <BurgerMenuOpen />}
				</button>
			</div>
		</>
	)
}

export default MobileMenu
