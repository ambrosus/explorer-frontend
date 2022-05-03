import Eth from 'assets/icons/Cryptos/Eth'
import React from 'react'

type TokenItemProps = {
	token: any
	selectedToken: any
	setToken: any
}

const TokenItem = ({ token, selectedToken, setToken }: TokenItemProps) => (
	<div
		className="tokenItem"
		onClick={() => {
			setToken(token)
		}}
		style={{
			// @ts-ignore
			backgroundColor:
				selectedToken &&
				selectedToken?.name &&
				selectedToken?.name === token?.name
					? '#EFF2F5'
					: null,
		}}
	>
		<div className="tokenItem__icon">
			<Eth />
		</div>
		<div className="tokenItem__tokens">
			<div>
				{token?.name?.length > 13
					? `${token?.name.slice(0, 11)}...`
					: token?.name}
			</div>
			<div className="universall__light2">{token?.balance}</div>
		</div>
		<div className="tokenItem__amount">
			{/*<div>{token?.balance}</div>*/}
			{/*<div className="universall__light2 universall__line-height">@0.00</div>*/}
		</div>
	</div>
)

export default TokenItem
