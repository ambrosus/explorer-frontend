import { Addresses } from './index';
import renderWithReduxAndRouter from '../../utils/test-helpers/renderWithReduxAndRouter'

describe('Addresses', () => {
  it('should render Addresses Component', () => {
    const { container } = renderWithReduxAndRouter(<Addresses />);
    expect(container).toMatchSnapshot();
  });
});
