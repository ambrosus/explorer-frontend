import LatestsHeading from './index';
import '@testing-library/jest-dom';
import renderWithReduxAndRouter from 'utils/test-helpers/renderWithReduxAndRouter';

describe('LatestsHeading render ', () => {
  test('displayed correctly', () => {
    const { container } = renderWithReduxAndRouter(<LatestsHeading />);
    expect(container).toMatchSnapshot();
    expect(container).not.toBeNull();
    expect(container).toBeInTheDocument();
    const matches = container.querySelectorAll('div');
    expect(matches).toHaveLength(3);
  });
});
