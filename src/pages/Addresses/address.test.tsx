import { Addresses } from './index';
import { render } from '@testing-library/react';

describe('Addresses', () => {
  it('should render Addresses Component', () => {
    const { container } = render(<Addresses />);
    expect(container).toMatchSnapshot();
  });
});
