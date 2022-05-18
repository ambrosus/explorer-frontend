import AddressesBody from './index';
import renderWithReduxAndRouter from '../../../utils/test-helpers/renderWithReduxAndRouter'

describe('AddressesBody', () => {
  it('should render AddressesBody Component', () => {
    const props = {
      address: '0x0',
      balance: {
        ether: 1,
        wei: '3d11d2',
      },
      rank: 100,
      txCount: 100,
      lastCardRef: null,
    };
    const { container } = renderWithReduxAndRouter(<AddressesBody {...props} />);
    expect(container).toMatchSnapshot();
  });
});
