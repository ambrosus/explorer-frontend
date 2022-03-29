import React, { useEffect } from 'react';
import { Content } from '../../../components/Content';
import { useParams } from 'react-router-dom';
import ContentCopy from '../../../assets/icons/ContentCopy';

export const AddressDetails = () => {
	const { address } = useParams();
	const reciveAdress = '0xF977814e90dA44bFA03b6295A0616a897441aceC';
	const copyConten = () => console.log(reciveAdress);

	useEffect(() => {
		if (address) {
			console.log('id', address);
			fetch(`https://blockbook.ambrosus.io/api/v2/address/${address}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					accept: 'application/json',
				},
			})
				.then((response) => response.json())
				.then((json) => console.log(json));
		}
	}, [address]);

	return (
		<Content>
			<section className='addressDetails'>
				<Content.Header>
					<h1 className='addressDetails__h1'>
						{address} <span className='addressDetails__h1-span'>{reciveAdress}</span>
						<button className='addressDetails__h1-btn' onClick={copyConten}>
							<ContentCopy />
						</button>
					</h1>
				</Content.Header>
				<Content.Body>
					<div>Addresses CONTENT</div>
				</Content.Body>
			</section>
		</Content>
	);
};
