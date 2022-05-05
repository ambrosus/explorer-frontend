import { useTypedSelector } from 'hooks/useTypedSelector'
import { FC, useEffect, useState } from 'react'

import TokenItem from '../TokenItem'

/**
 * @description TokenModal
 * @param {TokenModalProps} props
 * @returns {JSX.Element}
 */

interface TokenModalProps {
	selectedToken: string
	setToken: (token: string) => void
}

const TokenModal: FC<TokenModalProps> = ({ selectedToken, setToken }) => {
	const [name, setName] = useState('')
	const { data: addressData } = useTypedSelector((state: any) => state.position)
	const { tokens } = addressData
	const [filteredTokensList, setFilteredTokensList] = useState([])

	useEffect(() => {
		if (name) {
			const newTokensList = tokens.filter((token: any) =>
				token.name.toLowerCase().includes(name.toLowerCase())
			)
			setFilteredTokensList(newTokensList || [])
			if (!newTokensList.length) {
				setFilteredTokensList(tokens)
			}
		}
	}, [name, tokens, selectedToken])

	return (
		<div className="tokenModal" tabIndex={0}>
			<input
				className="tokenModal__search"
				placeholder="Search for Token Name"
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			{addressData && tokens && (
				<>
					<div>
						<div className="tokenModal__tokens">
							ERC-20 Tokens
							<span className="universall__light2" style={{ marginLeft: 4 }} />
						</div>
						<div className="tokenModal__arrows" />
					</div>
					{!filteredTokensList.length
						? tokens.map((token: { name: string; idx: number }) => (
								<TokenItem
									key={token.name + token.idx}
									selectedToken={selectedToken}
									token={token}
									setToken={setToken}
								/>
						  ))
						: filteredTokensList.map((token: { name: string; idx: number }) => (
								<TokenItem
									key={token.name + token.idx}
									selectedToken={selectedToken}
									token={token}
									setToken={setToken}
								/>
						  ))}
				</>
			)}
		</div>
	)
}

export default TokenModal
