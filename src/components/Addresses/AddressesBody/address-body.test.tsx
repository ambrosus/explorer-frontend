import { render } from '@testing-library/react'

import AddressesBody from './index'

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
		}
		const { container } = render(<AddressesBody {...props} />)
		expect(container).toMatchSnapshot()
	})
})
