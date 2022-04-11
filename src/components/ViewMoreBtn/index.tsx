import React from 'react';

type ViewMoreBtnProps = {
	nameBtn: string;
};

const ViewMoreBtn: React.FC<ViewMoreBtnProps> = ({ nameBtn }) => {
	const viewMoreFunc = () => console.log(nameBtn);

	return (
		<div className='latestBlocks__btn'>
			<button className='latestBlocks__btn-content' onClick={viewMoreFunc}>
				{nameBtn}
			</button>
		</div>
	);
};

export default ViewMoreBtn;
