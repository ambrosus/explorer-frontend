import ContentCopy from '../../../assets/icons/CopyIcons/ContentCopy';
import ContentCopyed from '../../../assets/icons/CopyIcons/ContentCopyed';
import useCopyContent from '../../../hooks/useCopyContent';
import Warning from '../Warning';
import React, { useState } from 'react';

const command =
  'source <(curl -s https://raw.githubusercontent.com/ambrosus/airdao-nop/master/setup.sh)';

const CommandText: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isWarningOpen, setIsWarningOpen] = useState(true);
  const { isCopy, copyContent, isCopyPopup } = useCopyContent(command);

  return (
    <div className="command-text">
      <p className="command-text__title">Command text</p>
      <button
        className={`command-text__btn ${
          isOpen ? 'command-text__btn_open' : ''
        }`}
        type="button"
        onClick={() => setIsOpen((state) => !state)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
        >
          <path
            d="M8 13.293L16 21.293L24 13.293"
            stroke="#1D1D1D"
            strokeWidth="1.52381"
            strokeLinecap="round"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="command-text__info">
          <div className="command-text__code">
            <p>{command}</p>
            <button className="command-text__copy" onClick={copyContent}>
              {isCopy ? (
                <>
                  <ContentCopyed />
                </>
              ) : (
                <ContentCopy />
              )}
            </button>
          </div>
          {isWarningOpen && (
            <Warning onClose={() => setIsWarningOpen(false)}>
              You need to use the private key from the node address when
              starting the server.
            </Warning>
          )}
        </div>
      )}
    </div>
  );
};

export default CommandText;
