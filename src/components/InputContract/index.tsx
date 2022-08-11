import { memo, useEffect, useRef, useState } from 'react';

const InputContranct = () => {
  const clearAddFiles = (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      <form className="input_contract"></form>
    </>
  );
};

export default memo(InputContranct);
