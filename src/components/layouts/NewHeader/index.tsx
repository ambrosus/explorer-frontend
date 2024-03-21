import MobileMenu from '../../menu/MobileMenu';
import DesctopMenu from 'components/menu/DesctopMenu';
import useDeviceSize from 'hooks/useDeviceSize';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { routes as menuItems } from 'routes';
import { IRoute } from 'types';

export const NewHeader = () => {
  const { FOR_LAPTOP } = useDeviceSize();

  const [isShow, setIsShow] = useState(false);

  const menu = menuItems.map((menuElement: IRoute, index: number) => {
    const disableClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      !menuElement.isClick && e.preventDefault();
      menuElement.isClick && setIsShow(false);
    };

    return (
      <NavLink
        to={`${menuElement.path}`}
        key={menuElement.key}
        className={({ isActive }) => {
          return `menu_item ${isActive ? 'menu_item_active' : ''}`;
        }}
        onClick={disableClick}
      >
        {menuElement.key}
      </NavLink>
    );
  });

  return (
    <div className="header subheader">
      <div className="container">
        <nav className="navigation">
          {FOR_LAPTOP ? (
            <DesctopMenu menu={menu} />
          ) : (
            <MobileMenu menu={menu} setIsShow={setIsShow} isShow={isShow} />
          )}
        </nav>
      </div>
    </div>
  );
};
