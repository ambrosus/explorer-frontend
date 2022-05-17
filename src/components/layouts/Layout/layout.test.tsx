import { Layout } from './index'
import renderWithReduxAndRouter from '../../../utils/test-helpers/renderWithReduxAndRouter'

const setUp = (props: any) =>
	renderWithReduxAndRouter(
		<Layout {...props}>
			{' '}
			<div className="children">children</div>
		</Layout>
	)

describe('should render Layout component', () => {
  let element: any
  beforeEach(() => {
    const { container } = setUp({})
    element = container
  })
  test('should render children', () => {
    expect(element.querySelectorAll('.children').length).toBe(1)
	})

	test('should contain .layout wrapper', () => {
		const wrapper = element.querySelectorAll('.layout')
		expect(wrapper.length).toBe(1)
	})

	test('should contain link', () => {
		const wrapper = element.querySelectorAll('.page')
		expect(wrapper.length).toBe(1)
	})
})
