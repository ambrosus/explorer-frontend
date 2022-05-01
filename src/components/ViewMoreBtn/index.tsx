import React from 'react'

import { ViewMoreBtnProps } from '../../pages/Home/home.interfaces'

const ViewMoreBtn: React.FC<ViewMoreBtnProps> = ({ nameBtn }) => {
	const viewMoreFunc = () => console.log(nameBtn)

	return (
		<div className="latestBlocks__btn">
			<button className="latestBlocks__btn-content" onClick={viewMoreFunc}>
				{nameBtn}
			</button>
		</div>
	)
}

export default ViewMoreBtn
