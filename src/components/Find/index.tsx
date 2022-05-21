import Search from 'assets/icons/Search';
import React from 'react';

interface FindProps {
  setIsShow: (value: boolean) => void;
}
const Find: React.FC<FindProps> = ({ setIsShow }) => {
  return (
    <>
      <button className="find" onClick={() => setIsShow(true)}>
        <Search fill={'#fff'} />
      </button>
    </>
  );
};

export default Find;
