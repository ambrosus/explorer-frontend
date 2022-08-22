import React, { useEffect } from 'react';

const Modal = ({ children }: any) => {
  return (
    <>
      <section className="fullscreen">{children}</section>
    </>
  );
};

export default Modal;
