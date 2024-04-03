import ArrowCaret from 'assets/icons/Arrows/ArrowCaret';
import { memo, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { subMenuItems } from 'routes';
import { IRoute } from 'types';

const SubMenu = ({closeMenu}: any) => {
  const [isSubMenu, setIsSubMenu] = useState<boolean>(false);
  const subMenuRef = useRef(null);

  const onClickHandler = () => {
    setIsSubMenu((prevIsSubMenu) => !prevIsSubMenu);
  };

  const subMenu = subMenuItems.map((menuElement: IRoute, index: number) => {
    const disableClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      !menuElement.isClick && e.preventDefault();
      menuElement.isClick && setIsSubMenu(false);
      closeMenu()
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
  );
};

export default memo(SubMenu);
