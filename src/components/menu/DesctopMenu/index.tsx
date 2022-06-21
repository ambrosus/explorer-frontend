import Find from 'components/Find';
import FindWide from 'components/Find/FindWide';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import React, { useRef, useState } from 'react';

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
  const searchRef = useRef(null);

  useOnClickOutside(searchRef, () => setIsShow(false));
  return (
    <>
      {isShow ? (
        <FindWide setIsShow={setIsShow} searchRef={searchRef} />
      ) : (
        <div className="menu">
          {menu}
          <Find setIsShow={setIsShow} />
        </div>
      )}
    </>
  );
};

export default DesctopMenu;
