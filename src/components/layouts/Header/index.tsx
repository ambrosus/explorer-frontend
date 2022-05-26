import MobileMenu from '../../menu/MobileMenu';
import AmbrosusLogoSvg from './AmbrosusLogoSvg';
import DesctopMenu from 'components/menu/DesctopMenu';
import useHover from 'hooks/useHover';
import useWindowSize from 'hooks/useWindowSize';
import React, { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { routes as menuItems } from 'routes';
import { IRoute } from 'types';

export const Header = () => {
  const { width } = useWindowSize();
  const [isShow, setIsShow] = useState(false);

  const isMobileStyle = width > 1100 ? 'menu_item' : 'mobile_menu_item';
  // const menuRef = useRef(null);
  // const [hoverRef, isHovered] = useHover({ refs: menuRef });

  const menu = menuItems.map((menuElement: IRoute, index: number) => {
    const cursor = menuElement.isClick ? 'universall_hover' : '';
    const activeStyle = {
      color: '#fff',
      cursor: cursor,
      // borderBottom: '4px solid #fff',
    };
    const disableClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      !menuElement.isClick && e.preventDefault();
      menuElement.isClick && setIsShow(false);
    };

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
        {/* {isHovered ? <span className="menu_item_hover"></span> : ''} */}
      </NavLink>
    );
  });

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
            <div>
              <DesctopMenu menu={menu} />
            </div>
          ) : (
            <MobileMenu menu={menu} setIsShow={setIsShow} isShow={isShow} />
          )}
        </nav>
      </div>
    </div>
  );
};
