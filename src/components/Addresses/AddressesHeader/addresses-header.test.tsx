import  AddressesHeader from './index'
import { render } from '@testing-library/react'

describe('AddressesHeader', () => {
  it('should render AddressesHeader Component', () => {
    const { container } = render(<AddressesHeader />)
    expect(container).toMatchSnapshot()
  })
})
