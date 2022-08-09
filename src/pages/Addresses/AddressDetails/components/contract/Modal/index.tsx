import React, { useEffect } from 'react';

const Modal = ({ children, handleClick }: any) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <>
      <section
        style={{
          zIndex: 1000,
          display: 'grid',
          position: 'fixed',
          background: 'rgba(0,0,0,0.3)',
          top: -350,
          width: '100%',
          left: 0,
          overflowY: 'scroll',
          bottom: -150,
          right: 0,
          placeItems: 'center center',
        }}
        onClick={handleClick}
      >
        <div onClick={(e) => e.stopPropagation()}>{children}</div>
      </section>
    </>
  );
};

export default Modal;
