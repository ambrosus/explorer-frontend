import Search from 'assets/icons/Search'
import React from 'react'

/*need jsDoc for FindWide function
 * @param {boolean} setIsShow - setIsShow is a boolean that is passed in from the parent component
 * @returns {JSX.Element} - returns a JSX.Element
 */

interface FindProps {
	setIsShow: (value: boolean) => void
}
const Find: React.FC<FindProps> = ({ setIsShow }) => {
	return (
		<>
			<button className="navigation__search" onClick={() => setIsShow(true)}>
				<Search fill={'#fff'} />
			</button>
		</>
	)
}

export default Find
