import ResetIcon from '../../../components/icons/reset-icon';
import SearchIcon from '../../../components/icons/search-icon';
import Input from '../../../components/ui/forms/input';
import { ISearch } from '../../../types';
import { useState } from 'react';

const SearchInput = ({ handler }: ISearch) => {
  const [value, setValue] = useState('');

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    handler(val);
  };

  const resetHandler = () => {
    setValue('');
    handler('');
  };

  return (
    <div className="hidden xl:flex items-center">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <SearchIcon />
        </div>
        <div className="flex-1">
          <Input
            onChange={onChangeHandler}
            value={value}
            className="pl-12 pr-11"
            placeholder="Search"
          />
        </div>
        {value && (
          <button
            type="button"
            onClick={resetHandler}
            className="absolute inset-y-0 right-0 flex items-center pr-4"
          >
            <ResetIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
