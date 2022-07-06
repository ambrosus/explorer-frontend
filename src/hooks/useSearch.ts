import API from '../API/api';
import { useDebounce } from './useDebounce';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

const useSearch = (setIsShow: Function) => {
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

  return {
    handleSubmit,
    err,
    name,
    handleChange,
  };
};

export default useSearch;
