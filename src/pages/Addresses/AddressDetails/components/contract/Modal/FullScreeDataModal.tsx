import CopyIcon from '../CopyIcon';
import Portal from '../Portal';
import FullScreen from 'assets/icons/FullScreen';
import Link from 'assets/icons/Link';
import React, { useState } from 'react';

const FullScreeDataModal = ({
  text,
  showRefHandler,
  fileOf,
  fileName,
}: any) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  function handleOpen() {
    setIsShow(true);
  }
  const handleClose = () => setIsShow(false);

  return (
    <>
      <button onClick={handleOpen}>
        <FullScreen />
      </button>
      {isShow && (
        <Portal>
          <section className="fullscreen">
            <div className="fullscreen_modal">
              <div className="fullscreen_modal-view">
                <div className="fullscreen_modal-heading">
                  <div className="fullscreen_modal-head">
                    {`${fileOf}: `}{' '}
                    <span style={{ fontWeight: 600 }}>{fileName}</span>{' '}
                  </div>
                  <div className="fullscreen_modal-buttons">
                    <div className="fullscreen_modal-btn1">
                      <CopyIcon content={text} />
                      <button
                        className="btn-contract-icon"
                        onClick={showRefHandler}
                      >
                        <Link />
                      </button>
                      <button onClick={handleClose}>
                        <FullScreen />
                      </button>
                    </div>
                    <button
                      className="fullscreen_modal-close"
                      onClick={handleClose}
                    >
                      X Close
                    </button>
                  </div>
                </div>

                <div className="counter">
                  <ol style={{ paddingLeft: 20 }}>
                    {text.split('\n').map((line: any, index: any) => (
                      <li key={index}>{line}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </section>
        </Portal>
      )}
    </>
  );
};

export default FullScreeDataModal;
