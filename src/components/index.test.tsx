import React from 'react'
import Main from './Main'
import renderWithReduxAndRouter from 'utils/test-helpers/renderWithReduxAndRouter'

test('Main Component render correctly', () => {
  const { container } = renderWithReduxAndRouter(<Main />)
  expect(container).not.toBeNull()
  const matches = container.querySelectorAll('div');
  expect(matches).toHaveLength(14);
  expect(container.querySelector('.page')).not.toBeUndefined()
  expect(container.querySelector('.footer')).not.toBeUndefined()
  expect(container.querySelector('.layout')).not.toBeUndefined()
  expect(container.querySelector('.header')).not.toBeUndefined()
  expect(container).toMatchSnapshot()
})
