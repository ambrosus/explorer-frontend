import { render } from '@testing-library/react'

import AddressesHeader from './index'

describe('AddressesHeader', () => {
	it('should render AddressesHeader Component', () => {
		const { container } = render(<AddressesHeader />)
		expect(container).toMatchSnapshot()
	})
})
