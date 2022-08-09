import FullScreen from '../../../../../../assets/icons/FullScreen';
import useToggle from '../../../../../../hooks/useToggle';
import Portal from '../Portal';
import Modal from './index';
import React from 'react';

const FullScreeDataModal = (text: any) => {
  const { toggled, setToggle } = useToggle();

  function handleOpen() {
    setToggle((prev: boolean) => !prev);
  }

  return toggled ? (
    <>
      <FullScreen onClick={handleOpen} />
      <Portal>
        <Modal handleClick={handleOpen}>
          <div className="fullscreen-view">
            <pre className="counter">{JSON.stringify(text, null, '')}</pre>
          </div>
        </Modal>
      </Portal>
    </>
  ) : (
    <FullScreen onClick={handleOpen} />
  );
};

export default FullScreeDataModal;
