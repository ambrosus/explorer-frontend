import Portal from '../Portal';
import Modal from './index';
import FullScreen from 'assets/icons/FullScreen';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import useToggle from 'hooks/useToggle';
import React, { useRef, useState } from 'react';

const FullScreeDataModal = (text: any) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const popUpRef = useRef(null);

  function handleOpen() {
    setIsShow(true);
  }

  useOnClickOutside(popUpRef, () => setIsShow(false));
  console.log(isShow);

  return (
    <>
      <button onClick={handleOpen}>
        <FullScreen />
      </button>
      {isShow && (
        <Portal>
          <Modal handleClick={handleOpen}>
            <div className="fullscreen-view" ref={popUpRef}>
              <pre className="counter">{JSON.stringify(text, null, '')}</pre>
            </div>
          </Modal>
        </Portal>
      )}
    </>
  );
};

export default FullScreeDataModal;
