const AddressesSort = ({ sortTerm, setSortTerm }: any) => {
	const sortOptions = [
		{
			label: 'Total Tx',
			value: 'totalTx',
		},
		{
			label: 'Address',
			value: 'address',
		},
		{
			label: 'Balance',
			value: 'balance',
		},
	]
	return (
		<div className="addresses__sort">
			<div className="addresses__sort-heading">Addresses</div>
			<div className="addresses__sort-cells">
				<div className="addresses__sort-cell">Sort by</div>
				{sortOptions.map((option, index) => (
					<div
						key={index}
						className={`addresses__sort-cell pointer ${
							option.value === sortTerm && 'addresses__sort-active'
						}`}
						onClick={() => {
							setSortTerm(option.value)
						}}
					>
						{option.label}
					</div>
				))}
			</div>
		</div>
	)
}

export default AddressesSort
