import API2 from '../API/newApi';
import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useSearch = (setIsShow: Function) => {
  const [err, setErr] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ['search', name],
    queryFn: () => (name?.length > 0 ? API2.searchItem(name) : null),
  });

  useEffect(() => {
    if (isError) {
      setErr(true);
      return;
    }

    if (isSuccess) {
      if (!data) {
        setErr(true);
      } else {
        setErr(false);
        // @ts-ignore
        setLink(data.redirect);
      }
    }
  }, [isSuccess, isError]);

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
