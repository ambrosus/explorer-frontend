import React, { useState } from 'react';
import arrow from '../../assets/svg/arrow.svg';

function onlyUnique(value: any, index: any, array: any) {
  return array.indexOf(value) === index;
}

interface InputWithDropdownProps {
  options: any[];
  selectedOption: string |  undefined;
  setSelectedOption: (option:string) => void;
}

const InputWithDropdown: React.FC<InputWithDropdownProps> = ({ options, selectedOption, setSelectedOption }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  const handleChange = (e: any) => handleOptionSelect(e.target.value);

  return (
    <div className="input-with-dropdown__wrapper">
      <input
        className="input-with-dropdown"
        type="text"
        value={selectedOption}
        placeholder="Select an option"
        onChange={handleChange}
      />
      <button className="dropdown-button" onClick={toggleDropdown}>
        <img src={arrow} alt="arrow"/>
      </button>
      {isDropdownOpen && (
        <ul className="dropdown-list">
          {options.filter(onlyUnique).map((option) => (
            <li key={option} className="dropdown-list__item" onClick={() => handleOptionSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputWithDropdown;
