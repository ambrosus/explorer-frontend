import FindWide from '.';
import { fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import renderWithReduxAndRouter from 'utils/test-helpers/renderWithReduxAndRouter';

describe('FindWide', () => {
  test('render correctly', () => {
    renderWithReduxAndRouter(<FindWide setIsShow={()=>{}}/>);
    expect(screen.getByPlaceholderText(/Search by Node/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search by Node/i)).not.toBeRequired();
    expect(screen.getByPlaceholderText(/Search by Node/i)).toBeEmpty();
    expect(screen.getByRole(/search/i)).toBeEmpty();
    expect(screen.getByRole(/search/i)).toMatchSnapshot();
  });

  test('change input state correctly', () => {
    const { container } = renderWithReduxAndRouter(<FindWide  setIsShow={()=>{}}/>);
    fireEvent.change(screen.getByPlaceholderText(/Search by Node/i), {
      target: { value: 'test' },
    });
    expect(screen.getByRole(/search/i)).toHaveDisplayValue('test');
    expect(screen.getByRole(/search/i)).toMatchSnapshot();
    expect(container).not.toBeNull();
    const matches = container.querySelectorAll('input');
    expect(matches).toHaveLength(1);
  });
});
