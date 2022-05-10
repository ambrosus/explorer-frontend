import AddressesHeader from 'components/AddressesHeader'
import AddressesSort from 'components/AddressesSort'
import { Content } from 'components/Content'
import React from 'react'

export const Addresses = () => (
	<Content>
		<Content.Header>
			<AddressesHeader />
		</Content.Header>
		<Content.Body>
			<div className="addresses__mainTable">
				<AddressesSort />
				<div className="addresses__table">
					<div className="addresses__header">
						<div className="addresses__header-cell">Rank</div>
						<div className="addresses__header-cell">Address</div>
						<div className="addresses__header-cell">Tx Count</div>
						<div className="addresses__header-cell">Balance</div>
						<div className="addresses__header-cell">Holding</div>
					</div>
					<div className="addresses__body">
						<div className="addresses__body-cell">1</div>
						<div className="addresses__body-cell">
							0xF977814e90dA44bFA03b6295A0616a897441aceC
						</div>
						<div className="addresses__body-cell">550</div>
						<div className="addresses__body-cell">1.33345 AMB</div>
						<div className="addresses__body-cell">0.00%</div>
					</div>
				</div>
			</div>
		</Content.Body>
	</Content>
)
