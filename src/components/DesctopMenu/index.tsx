import React, { useRef, useState } from 'react'
import Find from 'components/Find'
import FindWide from 'components/FindWide'
import { useOnClickOutside } from 'hooks/useOnClickOutside'

interface DesctopMenuProps {
	menu: any
}
const DesctopMenu: React.FC<DesctopMenuProps> = ({ menu }) => {
	const [isShow, setIsShow] = useState<boolean>(false)
	const searchRef = useRef(null)

	useOnClickOutside(searchRef, () => setIsShow(false))
	return (
		<>
			{isShow ? (
				<FindWide searchRef={searchRef} />
			) : (
				<div className="menu">
					{menu}
					<Find setIsShow={setIsShow} />
				</div>
			)}
		</>
	)
}

export default DesctopMenu
