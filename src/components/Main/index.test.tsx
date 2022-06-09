import Main from './Main';
import React from 'react';
import renderWithReduxAndRouter from 'utils/test-helpers/renderWithReduxAndRouter';

describe('time-value/coerce', function () {
  test('Main Component render correctly', () => {
    const { container } = renderWithReduxAndRouter(<Main />);
    expect(container).not.toBeNull();
    const matches = container.querySelectorAll('div');
    expect(container.querySelector('.page')).not.toBeUndefined();
    expect(container.querySelector('.footer')).not.toBeUndefined();
    expect(container.querySelector('.layout')).not.toBeUndefined();
    expect(container.querySelector('.header')).not.toBeUndefined();
    expect(container).toMatchSnapshot();
  });
});
