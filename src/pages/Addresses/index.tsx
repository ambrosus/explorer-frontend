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
			<div className="addresses__table">
				<div className="addressesSort__table">
					<div className="addressesSort__heading">Addresses</div>
					<div className="addressesSort__cells">
						<div className="addressesSort__cell">Sort by</div>
						<button className="addressesSort__cell">Addresses</button>
						<button className="addressesSort__cell">Balance</button>
						<button className="addressesSort__cell">Tx Count</button>
					</div>
				</div>
				<div className="addressesTable">
					<div className="addressesHeader__cells">
						<div className="addressesHeader__cell">Rank</div>
						<div className="addressesHeader__cell">Address</div>
						<div className="addressesHeader__cell">Tx Count</div>
						<div className="addressesHeader__cell">Balance</div>
						<div className="addressesHeader__cell">Holding</div>
					</div>
					<div className="addressesBody__cells">
						<div className="addressesBody__cell">1</div>
						<div className="addressesBody__cell">
							0xF977814e90dA44bFA03b6295A0616a897441aceC
						</div>
						<div className="addressesBody__cell">550</div>
						<div className="addressesBody__cell">1.33345 AMB</div>
						<div className="addressesBody__cell">0.00%</div>
					</div>
				</div>
			</div>
		</Content.Body>
	</Content>
)
