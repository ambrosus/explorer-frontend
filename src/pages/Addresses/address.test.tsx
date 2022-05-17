import { render } from '@testing-library/react'

import { Addresses } from './index'

describe('Addresses', () => {
	it('should render Addresses Component', () => {
		const { container } = render(<Addresses />)
		expect(container).toMatchSnapshot()
	})
})
