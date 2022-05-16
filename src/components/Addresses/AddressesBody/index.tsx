import Amb from 'assets/icons/Cryptos/Amb'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { Link } from 'react-router-dom'

const AddressesBody = ({
	address,
	balance,
	rank,
	txCount,
	lastCardRef,
}: any) => {
	const { data: appData } = useTypedSelector((state: any) => state.app)
	const totalSupply = appData && appData.tokenInfo.total_supply

	const ambBalance = balance && balance.ether ? balance.ether : 0

	const holdingPercentage = (ambBalance / totalSupply) * 100

	return (
		appData &&
		address && (
			<div className="addresses__body" ref={lastCardRef}>
				<div className="addresses__body-cell">{rank}</div>
				<Link to={`/addresses/${address}/`} className="addresses__body-cell">
					{address}
				</Link>
				<div className="addresses__body-cell">{txCount}</div>
				<div className="addresses__body-cell">
					<Amb />
					&nbsp;&nbsp;
					{ambBalance.toFixed(2)} AMB
				</div>

				<div className="addresses__body-cell">
					{(holdingPercentage || 0).toFixed(2)} %
				</div>
			</div>
		)
	)
}

export default AddressesBody
