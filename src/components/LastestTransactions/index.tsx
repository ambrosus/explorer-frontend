import React from 'react';
import GreenCircle from '../../assets/icons/GreenCircle';
import OrangeCircle from '../../assets/icons/OrangeCircle';

const LastestTransactions = () => {
	const online: boolean = true;
	return (
		<tbody className='lastestTransactions__tbody'>
			<tr className='lastestTransactions__tr'>
				<td className='lastestTransactions__td'>
					<p className='lastestTransactions__p '>
						<span className='lastestTransactions__circle'>{online ? <GreenCircle /> : <OrangeCircle />}</span>
						0x9012...328eb
					</p>

					<p className='lastestTransactions__p'>
						<span className='lastestTransactions__span-light'>6 secs ago</span>
					</p>
				</td>
				<td className='lastestTransactions__td'>
					<div className='lastestTransactions__td-div'>
						<p className='lastestTransactions__p'>
							<span className='lastestTransactions__span-light'>From</span>
							<span className='lastestTransactions__span-dark lastestTransactions__margin-left'>0x9012...328eb</span>
						</p>
						<p className='lastestTransactions__p'>
							<span className='lastestTransactions__span-dark'>To</span>
							<span className='lastestTransactions__span-light lastestTransactions__margin-left'>0x7056...238eb</span>
						</p>
					</div>
				</td>
				<td className='lastestTransactions__td'>
					<div className='lastestTransactions__td-div'>
						<p className='lastestTransactions__p' style={{ textAlign: 'right' }}>
							<span className='lastestTransactions__span-light' style={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
								Amount
							</span>
						</p>
						<p className='lastestTransactions__p'>
							<span className='lastestTransactions__span-dark'>1.71139 AMB</span>
						</p>
					</div>
				</td>
			</tr>
		</tbody>
	);
};

export default LastestTransactions;
