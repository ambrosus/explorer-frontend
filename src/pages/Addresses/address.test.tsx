import renderWithReduxAndRouter from '../../utils/test-helpers/renderWithReduxAndRouter';
import { Addresses } from './index';

describe('Addresses', () => {
  it('should render Addresses Component', () => {
    const { container } = renderWithReduxAndRouter(<Addresses />);
    expect(container).toMatchSnapshot();
  });
});
