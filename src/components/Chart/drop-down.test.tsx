import DropDown from './DropDown';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';

test('react-testing-library works!', () => {
  const rendered = render(
    <DropDown
      placeholder="Select an option"
      value="Son"
      options={[
        'Self',
        'Son',
        'Daughter',
        'Brother',
        'Sister',
        'Friend',
        'Relative',
      ]}
    />,
  );
  const dropdown: any = rendered.container.querySelector(
    '.Dropdown-placeholder',
  );
  fireEvent.click(dropdown);
  expect(rendered).toMatchSnapshot();
});
