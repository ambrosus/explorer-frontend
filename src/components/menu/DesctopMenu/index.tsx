import ArrowCaret from 'assets/icons/Arrows/ArrowCaret';
import Find from 'components/Find';
import FindWide from 'components/Find/FindWide';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import React, { memo, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { subMenuItems } from 'routes';
import { IRoute } from 'types';

/*
 * @param {string} props.title - title of the menu
 * @param {string} props.link - link of the menu
 *@return {JSX.Element} - return JSX.Element
 */
interface DesctopMenuProps {
  menu: any;
}

const DesctopMenu: React.FC<DesctopMenuProps> = ({ menu }) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isSubMenu, setIsSubMenu] = useState<boolean>(false);
  const searchRef = useRef(null);
  const subMenuRef = useRef(null);

  useOnClickOutside(searchRef, () => setIsShow(false));
  useOnClickOutside(subMenuRef, () => setIsSubMenu(false));

  const onClickHandler = () => {
    setIsSubMenu((prevIsSubMenu) => !prevIsSubMenu);
  };

  const subMenu = subMenuItems.map((menuElement: IRoute, index: number) => {
    const disableClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      !menuElement.isClick && e.preventDefault();
      menuElement.isClick && setIsShow(false);
    };

    return (
      <NavLink
        to={`${menuElement.path}/`}
        key={menuElement.key}
        className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
        onClick={disableClick}
      >
        {menuElement.key}
      </NavLink>
    );
  });

  return (
    <>
      {isShow ? (
        <FindWide setIsShow={setIsShow} searchRef={searchRef} />
      ) : (
        <div className="menu">
          {menu}
          <span className="list__item">
            <button
              className={`menu_item with_arrow ${
                isSubMenu ? 'menu_item_active' : ''
              }`}
              onClick={onClickHandler}
            >
              <span>More</span>
              <ArrowCaret />
            </button>

            {isSubMenu && (
              <div className="sub-menu" ref={subMenuRef}>
                <ul>{subMenu}</ul>
              </div>
            )}
          </span>

          <Find setIsShow={setIsShow} />
        </div>
      )}
    </>
  );
};

export default memo(DesctopMenu);
