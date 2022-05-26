import renderWithReduxAndRouter from 'utils/test-helpers/renderWithReduxAndRouter';
import '@testing-library/jest-dom';
import LatestsHeading from './index';


describe('LatestsHeading render ', () => {
  test('displayed correctly', () => {
    const { container} = renderWithReduxAndRouter(
      <LatestsHeading/>
    );
    expect(container).toMatchSnapshot();
    expect(container).not.toBeNull();
    expect(container).toBeInTheDocument();
    const matches = container.querySelectorAll('div');
    expect(matches).toHaveLength(3);
  });

});
