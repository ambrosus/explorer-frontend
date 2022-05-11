import AddressesBody from 'components/Addresses/AddressesBody'
import AddressesHeader from 'components/Addresses/AddressesHeader'
import AddressesSort from 'components/Addresses/AddressesSort'
import MainInfoAddresses from 'components/Addresses/MainInfoAddresses'
import { Content } from 'components/Content'
import React from 'react'

export const Addresses = () => (
	<Content>
		<Content.Header>
			<MainInfoAddresses />
		</Content.Header>
		<Content.Body>
			<div className="addresses__mainTable">
				<AddressesSort />
				<div className="addresses__table">
					<AddressesHeader />

					<AddressesBody />
					<AddressesBody />
					<AddressesBody />
				</div>
			</div>
		</Content.Body>
	</Content>
)
