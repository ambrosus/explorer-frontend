import useSearch from '../../../hooks/useSearch';
import Search from 'assets/icons/Search';
import { FindWideMobileProps } from 'pages/Home/home.interfaces';
import React from 'react';

const FindWideMobile: React.FC<FindWideMobileProps> = ({
  searchRef,
  setIsShow,
}) => {
  const { handleSubmit, err, name, handleChange } = useSearch(setIsShow);

  return (
    <>
      <form
        ref={searchRef}
        className="find_wide_mobile"
        onSubmit={handleSubmit}
      >
        <input
          className="find_wide_mobile_input"
          placeholder="Node, Address, Tx, Block, Token..."
          type="text"
          style={{
            fontSize: 16,
            color: err ? 'red' : 'black',
          }}
          value={name}
          onChange={handleChange}
        />

        <button className="find_wide_mobile_btn" type="submit">
          <Search fill={'#808A9D'} />
        </button>
      </form>
    </>
  );
};

export default FindWideMobile;
