import API from 'API/api';
import Search from 'assets/icons/Search';
import { useDebounce } from 'hooks/useDebounce';
import { FindWideProps } from 'pages/Home/home.interfaces';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FindWide: React.FC<FindWideProps> = ({ searchRef }) => {
  const [name, setName] = useState<string>('');
  const navigate = useNavigate();
  const debouncedSearchTerm = useDebounce(name, 50);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!debouncedSearchTerm) {
      return;
    }
    API.searchItem(debouncedSearchTerm)
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
          window.location.href = `/${searchTerm}/`;
        } else {
          navigate(`/notfound`);
        }
      })
      .catch(() => {
        navigate(`/notfound`);
      });
  };

  return (
    <>
      <form ref={searchRef} className="find_wide" onSubmit={handleSubmit}>
        <input
          role="search"
          className="find_wide_input"
          placeholder="Search by Node, Address, Tx, Block, Token, Bundle"
          type="text"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />

        <button role="find" className="find_wide_btn" type="submit">
          <Search fill={'#808A9D'} />
        </button>
      </form>
    </>
  );
};

export default FindWide;
