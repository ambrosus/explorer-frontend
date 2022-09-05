import BurgerMenuClose from 'assets/icons/MobileMenu/BurgerMenuClose';
import BurgerMenuOpen from 'assets/icons/MobileMenu/BurgerMenuOpen';
import logo from 'assets/svg/logo-air.svg';
import FindWideMobile from 'components/Find/FindWideMobile';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import React, { useRef } from 'react';
import {NavLink} from "react-router-dom";

interface MobileMenuProps {
  menu: any;
  setIsShow: any;
  isShow: any;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ menu, setIsShow, isShow }) => {
  const menuRef = useRef(null);

  useOnClickOutside(menuRef, () => setIsShow(false));

  return (
    <>
      <div ref={menuRef} className="mobile_menu">
        <button onClick={() => setIsShow(!isShow)} className="mobile_menu_btn">
          {isShow ? <BurgerMenuClose /> : <BurgerMenuOpen />} Explorer
        </button>
        {isShow && (
          <div className="mobile_menu_modal">
            <NavLink to="/" className="mobile_menu_logo">
              <img src={logo} alt="logo"/>
            </NavLink>
            <span>
              <FindWideMobile setIsShow={setIsShow} />
            </span>
            {menu}
          </div>
        )}
      </div>
    </>
  );
};

export default MobileMenu;
