import React, { useState } from 'react'
import BurgerMenuOpen from '../../assets/icons/MobileMenu/BurgerMenuOpen'
import BurgerMenuClose from '../../assets/icons/MobileMenu/BurgerMenuClose'
import FindWideMobile from '../../components/FindWideMobile'

interface MobileMenuProps {
	menu: any
}
const MobileMenu: React.FC<MobileMenuProps> = ({ menu }) => {
	const [isShow, setIsShow] = useState(false)
	return (
		<>
			<div className="mobile">
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
