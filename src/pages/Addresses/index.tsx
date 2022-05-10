import { Content } from 'components/Content'
import React from 'react'

export const Addresses = () => (
	<Content>
		<Content.Header>
			<div className="addressesHeader">
				<h1 className="addressesHeader__heading">Accounts</h1>
				<div className="addressesHeader__table">
					<div className="addressesHeader__cells">
						<div className="addressesHeader__cell">Total addresses</div>
						<div className="addressesHeader__cell">17,870</div>
					</div>
					<div className="addressesHeader__cells">
						<div className="addressesHeader__cell">Holders</div>
						<div className="addressesHeader__cell">14,613</div>
					</div>
				</div>
			</div>
		</Content.Header>
		<Content.Body>
			<div className="addresses__mainTable">
				<div className="addresses__sort">
					<div className="addresses__sort-heading">Addresses</div>
					<div className="addresses__sort-cells">
						<div className="addresses__sort-cell">Sort by</div>
						<button className="addresses__sort-cell">Addresses</button>
						<button className="addresses__sort-cell">Balance</button>
						<button className="addresses__sort-cell">Tx Count</button>
					</div>
				</div>
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
