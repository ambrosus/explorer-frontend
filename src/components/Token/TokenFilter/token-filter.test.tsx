import TokenFilter from '.';
import { fireEvent } from '@testing-library/dom';
import renderWithReduxAndRouter from 'utils/test-helpers/renderWithReduxAndRouter';

describe('TokenFilter', () => {
  test('render correctly', () => {
    const { container } = renderWithReduxAndRouter(<TokenFilter />);
    expect(container).not.toBeNull();
    const matches = container.querySelectorAll('div');
    expect(matches).toHaveLength(2);
  });

  test('render correctly without tokens', () => {
    const { getByText, getByRole } = renderWithReduxAndRouter(<TokenFilter />);
    fireEvent.click(getByRole('button'));
    expect(getByText(/You don't have tokens yet/i)).toMatchSnapshot();
  });

  test('render correctly with tokens array', () => {
    const { container, getByText, getByRole } = renderWithReduxAndRouter(
      <TokenFilter
        addressData={{
          tokens: [
            {
              type: 'ERC20',
              name: 'Ganymede pool token',
              contract: '0x13243210d4747a1fe03395095c21213',
              transfers: 4,
              idx: 1,
              balance: '0.00',
              totalSupply: 0,
            },
          ],
        }}
      />,
    );
    const matchesBefore = container.querySelectorAll('div');
    expect(matchesBefore).toHaveLength(2);
    fireEvent.click(getByRole('button'));
    expect(getByText(/Ganymede pool token/i)).toMatchSnapshot();
    const matchesAfter = container.querySelectorAll('div');
    expect(matchesAfter).toHaveLength(12);
  });
});
