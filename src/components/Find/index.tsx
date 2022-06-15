import Search from 'assets/icons/Search';
import React from 'react';

interface FindProps {
  setIsShow: (value: boolean) => void;
}

const Find: React.FC<FindProps> = ({ setIsShow }) => {
  function toggleShow() {
    setIsShow(true)
  }

  return (
    <>
      <button className="find" onClick={toggleShow}>
        <Search fill={'#fff'} />
      </button>
    </>
  );
};

export default Find;
