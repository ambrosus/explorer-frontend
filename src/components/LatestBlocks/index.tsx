import React from 'react';
import GreenCircle from '../../assets/icons/GreenCircle';
import OrangeCircle from '../../assets/icons/OrangeCircle';

type LatestBlocksProps = {};

const LatestBlocks: React.FC<LatestBlocksProps> = () => {
	const online: boolean = true;
	const isOnline = online ? <GreenCircle /> : <OrangeCircle />;
	return (
		<>
			<div className='latestBlocks__cells'>
				<div className='latestBlocks__cell'>
					<div className='latestBlocks__cell-content latestBlocks__font-big'>
						<span>{isOnline}</span>
						17122153
					</div>

					<div className='latestBlocks__p latestBlocks__font-small'>46 secs ago</div>
				</div>

				<div className='latestBlocks__cell'>
					<div className='latestBlocks__cell-content'>
						<div className='latestBlocks__font-small'>Validator</div>
						<div className='latestBlocks__font-big latestBlocks__margin-left'>0x9012...328eb</div>
					</div>
					<div className='latestBlocks__cell-content'>
						<div className='latestBlocks__font-small'>0 txns</div>
						<div className='latestBlocks__font-big latestBlocks__margin-left'>46 secs ago</div>
					</div>
				</div>
				<div className='latestBlocks__cell'>
					<div className='latestBlocks__cell-content latestBlocks__font-small'>Block Reward</div>
					<div className='latestBlocks__cell-content latestBlocks__font-big'>1.71139 AMB</div>
				</div>
			</div>
		</>
	);
};

export default LatestBlocks;
