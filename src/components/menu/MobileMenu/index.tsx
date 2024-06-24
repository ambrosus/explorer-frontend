import SubMenu from '../SubMenu';
import close from 'assets/svg/close.svg';
import FindWideMobile from 'components/Find/FindWideMobile';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import React, { useEffect, useRef } from 'react';

interface MobileMenuProps {
  menu: any;
  setIsShow: any;
  isShow: any;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ menu, setIsShow, isShow }) => {
  const menuRef = useRef(null);

  useOnClickOutside(menuRef, () => setIsShow(false));

  useEffect(() => {
    if (window.innerWidth <= 1200) {
      document.body.style.overflow = isShow ? 'hidden' : 'auto';
    }
  }, [isShow]);

  const handleClose = () => setIsShow(!isShow);

  return (
    <>
      <div ref={menuRef} className="mobile_menu">
        <button onClick={handleClose} className="mobile_menu_btn">
          Explorer Menu
        </button>
        {isShow && (
          <div className="mobile_menu_modal">
            <h2 className="mobile_menu_modal__title">Explorer – Menu</h2>
            <button onClick={handleClose} type="button" className="help__close">
              <img src={close} alt="close help" />
            </button>
            <span>
              <FindWideMobile setIsShow={setIsShow} />
            </span>
            {menu}
            <SubMenu closeMenu={handleClose} />
          </div>
        )}
      </div>
    </>
  );
};

export default MobileMenu;
