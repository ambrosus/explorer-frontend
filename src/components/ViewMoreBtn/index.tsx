import React from 'react';

type ViewMoreBtnProps = {
	nameBtn: string;
};

const ViewMoreBtn: React.FC<ViewMoreBtnProps> = ({ nameBtn }) => {
	const viewMoreFunc = () => console.log(nameBtn);

	return (
		<button className='latestBlocks__btn-content' onClick={viewMoreFunc}>
			{nameBtn}
		</button>
	);
};

export default ViewMoreBtn;
