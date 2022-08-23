import FullScreen from 'assets/icons/FullScreen';
import Link from 'assets/icons/Link';
import ContractCopyBtn from 'components/ContractCopyBtn';
import Portal from 'components/Portal';
import React, { useState } from 'react';

const FullScreeDataModal = ({ text, fileOf, fileName }: any) => {
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
                    {fileOf && `${fileOf}: `}
                    <span style={{ fontWeight: 600 }}>{fileName}</span>{' '}
                  </div>
                  <button
                    className="fullscreen_modal-close"
                    onClick={handleClose}
                  >
                    X Close
                  </button>
                </div>

                <div className="fullscreen_modal-body">
                  <ol style={{ paddingLeft: 20 }}>
                    {text.split('\n').map((line: any, index: any) => (
                      <li className="universall_ibm_font" key={index}>
                        {line}
                      </li>
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
