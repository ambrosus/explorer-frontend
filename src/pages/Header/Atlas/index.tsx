import React, { useEffect } from 'react';
import { Content } from '../../../components/Content';

export const Atlas = () => {
	useEffect(() => {
		fetch(`https://blockbook.ambrosus.io/api/v2/address/0xB500558a3886ecf07B4B4B31B54c4bd1ef378D34`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				accept: 'application/json',
			},
		})
			.then((response) => response.json())
			.then((json) => console.log(json));
	}, []);

	return (
		<Content>
			<Content.Header>
				<h1>Atlas</h1>
			</Content.Header>
			<Content.Body>
				<div>Atlas CONTENT</div>
			</Content.Body>
		</Content>
	);
};
