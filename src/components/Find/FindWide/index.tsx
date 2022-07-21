import useSearch from '../../../hooks/useSearch';
import Search from 'assets/icons/Search';
import { FindWideProps } from 'pages/Home/home.interfaces';
import React from 'react';

const FindWide: React.FC<FindWideProps> = ({
  setIsShow = () => {},
  searchRef,
}) => {
  const { handleSubmit, err, name, handleChange } = useSearch(setIsShow);

  return (
    <>
      <form ref={searchRef} className="find_wide" onSubmit={handleSubmit}>
        <input
          role="search"
          className="find_wide_input"
          style={{
            color: err ? 'red' : '#808A9D',
          }}
          placeholder="Search by Node, Address, Tx, Block, Token, Bundle"
          type="text"
          value={name}
          onChange={handleChange}
        />

        <button role="find" className="find_wide_btn" type="submit">
          <Search fill={'#808A9D'} />
        </button>
      </form>
    </>
  );
};

export default FindWide;
