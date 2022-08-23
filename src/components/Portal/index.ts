import { createPortal } from 'react-dom';

const portalRoot: any = document.getElementById('portal');

const Portal = ({ children }: any) => {
  return createPortal(children, portalRoot);
};

export default Portal;
