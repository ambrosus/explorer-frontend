import MobileMenu from '../../menu/MobileMenu';
import AmbrosusLogoSvg from './AmbrosusLogoSvg';
import DesctopMenu from 'components/menu/DesctopMenu';
import useDeviceSize from 'hooks/useDeviceSize';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { routes as menuItems } from 'routes';
import { IRoute } from 'types';

export const Header = () => {
  const { FOR_BIG_TABLET } = useDeviceSize();

  const [isShow, setIsShow] = useState(false);

  const isMobileStyle = FOR_BIG_TABLET ? 'menu_item' : 'mobile_menu_item';

  const menu = menuItems.map((menuElement: IRoute, index: number) => {
    const cursor = menuElement.isClick ? 'universall_hover' : '';
    const isHover = menuElement.isClick ? 'menu_item_hover' : '';
    const isColor = menuElement.isClick ? '#fff' : '';
    const activeStyle = {
      color: '#fff',
      cursor: cursor,
    };
    const disableClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      !menuElement.isClick && e.preventDefault();
      menuElement.isClick && setIsShow(false);
    };

    return (
      <NavLink
        to={menuElement.path}
        key={menuElement.key}
        className={({ isActive }) =>
          `${isMobileStyle} ${cursor} ${isHover} ${
            isActive ? 'menu_item_active' : ''
          }`
        }
        style={({ isActive }) => ({
          ...(isActive ? activeStyle : null),
          color: isColor,
        })}
        onClick={disableClick}
      >
        {menuElement.key}
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
          {FOR_BIG_TABLET ? (
            <DesctopMenu menu={menu} />
          ) : (
            <MobileMenu menu={menu} setIsShow={setIsShow} isShow={isShow} />
          )}
        </nav>
      </div>
    </div>
  );
};
