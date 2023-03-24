import React from 'react';
import useSearch from '../../../hooks/useSearch';
import Search from 'assets/icons/Search';
import { FindWideProps } from 'pages/Home/home.interfaces';

const FindWide: React.FC<FindWideProps> = ({
  setIsShow = () => {},
  searchRef,
}) => {
  const { handleSubmit, err, name, handleChange } = useSearch(setIsShow);

  return (
    <form ref={searchRef} className="find_wide" onSubmit={handleSubmit}>
      <input
        role="search"
        className="find_wide_input"
        style={{
          color: err ? '#ff4747' : '#808A9D',
        }}
        placeholder="Search by Node, Address, Tx, Block, Token"
        type="text"
        value={name}
        onChange={handleChange}
      />
      <button role="find" className="find_wide_btn" type="submit">
        <Search />
      </button>
    </form>
  );
};

export default FindWide;
