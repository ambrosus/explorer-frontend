import API2 from '../API/newApi';
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
    () => (name?.length > 0 ? API2.searchItem(name) : null),
    {
      onSuccess: (data: any) => {
        if (!data) {
          setErr(true);
        } else {
          setErr(false);
          setLink(data.redirect);
        }
      },
      onError: () => {
        setErr(true);
      },
    },
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (
    //   name.trim() === '0x0000000000000000000000000000000000000000' ||
    //   Number(name.trim()) === 0 ||
    //   !name.length
    // ) {
    //   setErr(true);
    //   return;
    // }
    // if (!name) {
    //   return;
    // }
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
