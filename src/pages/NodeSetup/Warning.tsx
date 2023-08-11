import React from 'react';
import warningYellow from '../../assets/svg/warning-yellow.svg';
import close from '../../assets/svg/node-close.svg';

interface WarningProps {
  children: any;
  onClose: () => void;
}

const Warning: React.FC<WarningProps> = ({ children, onClose }) => {
  return (
    <div className="node-setup-warning">
      <img src={warningYellow} alt="warning" className="node-setup-warning__img"/>
      {children}
      <button className="node-setup-warning__close" onClick={onClose}>
        <img src={close} alt="close"/>
      </button>
    </div>
  )
}

export default Warning;
