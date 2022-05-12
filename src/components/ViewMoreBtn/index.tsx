import React from 'react'

import { ViewMoreBtnProps } from '../../pages/Home/home.interfaces'

const ViewMoreBtn: React.FC<ViewMoreBtnProps> = ({ nameBtn, onclick }) => (
	<div className="latestBlocks__btn">
		<button
			className="latestBlocks__btn-content"
			onClick={onclick ? onclick : () => {}}
		>
			{nameBtn}
		</button>
	</div>
)

export default ViewMoreBtn
