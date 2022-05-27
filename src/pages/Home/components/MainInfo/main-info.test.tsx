import MainInfo from './index';
import renderWithReduxAndRouter from 'utils/test-helpers/renderWithReduxAndRouter';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { currenCurrency, numberWithCommas } from '../../../../utils/helpers';


describe('MainInfo render ', () => {
  const value = 2000
  const name = "test"
  test('displayed correctly', () => {
    const { container} = renderWithReduxAndRouter(
      <MainInfo value={value}  name={name}/>
    );
    expect(screen.getByRole('main-info__name')).toHaveTextContent(name);
    expect(screen.getByRole('main-info__value')).toHaveTextContent(numberWithCommas(currenCurrency(value,name)));
    expect(container).not.toBeNull();
    const matches = container.querySelectorAll('div');
    expect(matches).toHaveLength(3);
  });

});
