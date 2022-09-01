import BurgerMenuClose from 'assets/icons/MobileMenu/BurgerMenuClose';
import BurgerMenuOpen from 'assets/icons/MobileMenu/BurgerMenuOpen';
import FindWideMobile from 'components/Find/FindWideMobile';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import React, { useRef } from 'react';

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
          {isShow ? <BurgerMenuClose /> : <BurgerMenuOpen />}
        </button>
        {isShow && (
          <div className="mobile_menu_modal">
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
