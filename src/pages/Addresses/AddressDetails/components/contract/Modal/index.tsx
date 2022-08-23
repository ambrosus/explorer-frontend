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
      <section className="fullscreen" onClick={handleClick}>
        <div style={{ borderRadius: 16 }} onClick={(e) => e.preventDefault()}>
          {children}
        </div>
      </section>
    </>
  );
};

export default Modal;
