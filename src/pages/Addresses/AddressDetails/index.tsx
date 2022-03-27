import React, { useEffect } from 'react';
import { Content } from '../../../components/Content';
import { useParams } from 'react-router-dom';

export const AddressDetails = () => {
	const { address }= useParams();

	useEffect(()=>{
		if (address){
			console.log('id',address);
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

	},[address])

	return (
		<Content>
			<Content.Header>
				<h1>Address Details {address}</h1>
			</Content.Header>
			<Content.Body>
				<div>Addresses CONTENT</div>
			</Content.Body>
		</Content>
	);
}
