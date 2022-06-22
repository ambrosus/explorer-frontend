import { currenCurrency, numberWithCommas } from '../../../../utils/helpers';
import MainInfo from './index';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import renderWithReduxAndRouter from 'utils/test-helpers/renderWithReduxAndRouter';

describe('MainInfo render ', () => {
  const value = 2000;
  const name = 'test';
  test('displayed correctly', () => {
    const { container } = renderWithReduxAndRouter(
      <MainInfo value={value} name={name} />,
    );
    expect(screen.getByRole('main-info__name')).toHaveTextContent(name);
    expect(container).not.toBeNull();
    const matches = container.querySelectorAll('div');
    expect(matches).toHaveLength(3);
  });
});
