import API from 'API/api';
import Search from 'assets/icons/Search';
import { FindWideMobileProps } from 'pages/Home/home.interfaces';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FindWideMobile: React.FC<FindWideMobileProps> = ({
  searchRef,
  setIsShow,
}) => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) {
      return;
    }
    API.searchItem(name)
      .then((data: any) => {
        setName('');
        let searchTerm = data.data;

        if (searchTerm && searchTerm.term !== undefined) {
          const urlParts = data.meta.search.split('/');
          urlParts[urlParts.length - 1] = searchTerm.term;
          searchTerm = urlParts.join('/');
        } else {
          searchTerm = data.meta.search;
        }
        if (data.meta.search) {
          navigate(`/${searchTerm}/`, { replace: true });
        } else {
          navigate(`/notfound`);
        }
      })
      .catch(() => {
        navigate(`/notfound`);
      });
    setTimeout(() => setIsShow(false), 0);
  };

  return (
    <>
      <form
        ref={searchRef}
        className="find_wide_mobile"
        onSubmit={handleSubmit}
      >
        <input
          className="find_wide_mobile_input"
          placeholder="Search by Node, Address, Tx, Block, Toke..."
          type="text"
          style={{ fontSize: 16 }}
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />

        <button className="find_wide_mobile_btn" type="submit">
          <Search fill={'#808A9D'} />
        </button>
      </form>
    </>
  );
};

export default FindWideMobile;
