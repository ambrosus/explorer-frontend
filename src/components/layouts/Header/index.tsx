import MobileMenu from '../../menu/MobileMenu';
import AmbrosusLogoSvg from './AmbrosusLogoSvg';
import DesctopMenu from 'components/menu/DesctopMenu';
import useWindowSize from 'hooks/useWindowSize';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { routes as menuItems } from 'routes';
import { IRoute } from 'types';

export const Header = () => {
  const { width } = useWindowSize();
  const [isShow, setIsShow] = useState(false);

  const isMobileStyle = width > 1100 ? 'menu_item' : 'mobile_menu_item';

  const menu = menuItems.map((menuElement: IRoute) => {
    const cursor = menuElement.isClick ? 'universall_hover' : '';
    const activeStyle = {
      color: '#fff',
      cursor: cursor,
    };
    const disableClick = (e: any) => {
      !menuElement.isClick && e.preventDefault();
      menuElement.isClick && setIsShow(false);
    };

    return (
      <NavLink
        replace
        to={menuElement.path}
        key={menuElement.key}
        className={`${isMobileStyle} ${cursor}`}
        style={({ isActive }) => ({
          ...(isActive ? activeStyle : null),
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
            <NavLink replace to="/">
              <AmbrosusLogoSvg />
            </NavLink>
          </div>
          {width > 1108 ? (
            <DesctopMenu menu={menu} />
          ) : (
            <MobileMenu menu={menu} setIsShow={setIsShow} isShow={isShow} />
          )}
        </nav>
      </div>
    </div>
  );
};
