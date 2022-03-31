import React from 'react';

type ViewMoreBtnProps = {
	nameBtn: string;
};

const ViewMoreBtn: React.FC<ViewMoreBtnProps> = ({ nameBtn }) => {
	const viewMoreFunc = () => console.log(nameBtn);

	return (
		<button className='home__btn' onClick={viewMoreFunc}>
			{nameBtn}
		</button>
	);
};

export default ViewMoreBtn;
