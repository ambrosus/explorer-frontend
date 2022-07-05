import API from 'API/api';
import Search from 'assets/icons/Search';
import { useDebounce } from 'hooks/useDebounce';
import { FindWideProps } from 'pages/Home/home.interfaces';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

const FindWide: React.FC<FindWideProps> = ({ setIsShow, searchRef }) => {
  const [err, setErr] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const navigate = useNavigate();
  const debouncedSearchTerm = useDebounce(name, 500);

  const { isLoading } = useQuery(
    ['search', debouncedSearchTerm],
    () => API.searchItem(debouncedSearchTerm),
    {
      onSuccess: (data: any) => {
        if (!data) {
          setErr(true);
        } else {
          let searchTerm = data.data;
          setErr(false);
          if (searchTerm && searchTerm.term !== undefined) {
            const urlParts = data?.meta.search.split('/');
            urlParts[urlParts.length - 1] = searchTerm.term;
            searchTerm = urlParts.join('/');
          } else {
            searchTerm = data?.meta.search;
          }
          if (
            data.meta.search &&
            !searchTerm.includes(['hermes' || 'transaction'])
          ) {
            setLink(`/${searchTerm}/`);
          } else {
            setErr(true);
          }
        }
      },
      onError: () => {
        setName('');
      },
    },
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!debouncedSearchTerm) {
      return;
    }
    if (!isLoading && !err) {
      navigate(link);
      if (!!setIsShow) {
        setIsShow((prev: any) => !prev);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setErr(false);
    setName(e.target.value.trim());
  };

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
