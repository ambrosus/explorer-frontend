import API from 'API/api'
import Search from 'assets/icons/Search'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { FindWideProps } from '../../pages/Home/home.interfaces'

const FindWide: React.FC<FindWideProps> = ({ searchRef }) => {
	const [name, setName] = useState<string>('')
	const navigate = useNavigate()

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!name) {
			return
		}
		API.searchItem(name)
			.then((data: any) => {
				setName('')
				let searchTerm = data.data

				if (searchTerm && searchTerm.term !== undefined) {
					const urlParts = data.meta.search.split('/')
					urlParts[urlParts.length - 1] = searchTerm.term
					searchTerm = urlParts.join('/')
				} else {
					searchTerm = data.meta.search
				}
				if (data.meta.search) {
					navigate(`/${searchTerm}/`)
				} else {
					navigate('/notfound')
				}
			})
			.catch(() => {
				navigate('/notfound')
			})
	}
	// const handleAllFilters = () => console.log('handleAllFilters')

	return (
		<>
			<form ref={searchRef} className="search" onSubmit={handleSubmit}>
				<input
					className="search__input"
					placeholder="Search by Node, Address, Tx, Block, Token, Bundle"
					type="text"
					value={name}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setName(e.target.value)
					}
				/>
				{/* <div className="search__filters vl">
					<button onClick={handleAllFilters}>
						<span>All filters</span>
					</button>
					<span style={{ display: 'flex', margin: '0 10px' }}>
						<ArrowDown />
					</span>
				</div> */}
				<button className="search__btn" type="submit">
					<Search fill={'#808A9D'} />
				</button>
			</form>
		</>
	)
}

export default FindWide
