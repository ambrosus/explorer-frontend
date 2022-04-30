import API from 'API/api'
import Search from 'assets/icons/Search'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { toastr } from 'react-redux-toastr'
import { useNavigate } from 'react-router-dom'

import { FindWideMobileProps } from '../../pages/Home/home.interfaces'

const FindWideMobile: React.FC<FindWideMobileProps> = ({ searchRef }) => {
	const [name, setName] = useState('')
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
					toastr.error('404', 'No matches found')
				}
			})
			.catch(() => {
				toastr.error('404', 'No matches found')
			})
	}

	return (
		<>
			<form ref={searchRef} className="searchMobile" onSubmit={handleSubmit}>
				<input
					className="searchMobile__input"
					placeholder="Search by Node, Address, Tx, Block, Toke..."
					type="text"
					value={name}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setName(e.target.value)
					}
				/>

				<button className="searchMobile__btn" type="submit">
					<Search fill={'#808A9D'} />
				</button>
			</form>
		</>
	)
}

export default FindWideMobile
