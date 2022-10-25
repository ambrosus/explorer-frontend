import API from '../API/api';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

const useSearch = (setIsShow: Function) => {
  const [err, setErr] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const navigate = useNavigate();

  const { isLoading } = useQuery(
    ['search', name],
    () => (name?.length > 0 ? API.searchItem(name) : null),
    {
      onSuccess: (data: any) => {
        console.log(data);
        if (!data) {
          setErr(true);
        } else {
          if (
            name.trim() === '0x0000000000000000000000000000000000000000' ||
            Number(name.trim()) === 0 ||
            !name.length
          ) {
            setErr(true);
            return;
          }
          let searchTerm = data.data;
          setErr(false);
          if (searchTerm && searchTerm.term !== undefined) {
            const urlParts = data?.meta.search.trim().split('/');
            urlParts[urlParts.length - 1] = searchTerm.term;
            searchTerm = urlParts.join('/');
          } else {
            searchTerm = data?.meta.search;
          }
          if (data.meta.search && !searchTerm.trim().includes(['hermes'])) {
            const searchValue = searchTerm
              .trim()
              .replace('addresses', 'address')
              .replace('transactions', 'tx');
            setLink(`/${searchValue}/`);
          } else {
            setErr(true);
          }
        }
      },
      onError: () => {
        setErr(true);
      },
    },
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      name.trim() === '0x0000000000000000000000000000000000000000' ||
      Number(name.trim()) === 0 ||
      !name.length
    ) {
      setErr(true);
      return;
    }
    if (!name) {
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
