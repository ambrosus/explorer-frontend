import React, { useEffect, useState } from 'react';
import { Content } from '../../../components/Content';
import { useParams } from 'react-router-dom';
import ContentCopy from '../../../assets/icons/ContentCopy';
import API from '../../../API/api';
import OveralBalance from '../../../components/OveralBalance';

import Token from '../../../components/Token';

import Tabs from '../../../components/Tabs';

export const AddressDetails = () => {
	const { address } = useParams();

	const [transactionType, setTransactionType] = useState('');
	const [addressData, setAddressData] = useState<any>(null);
	const sybStringAddress = `${address && address.slice(0, 10)}...${address && address.slice(address.length - 10)}`;

	const copyConten = () => console.log(sybStringAddress);

	useEffect(() => {
		if (address) {
			API.getDataForAddress(address.trim(), { limit: 50, type: transactionType }, setAddressData);
		}
	}, [address, transactionType]);

	return (
		<Content>
			<section className='addressDetails'>
				<Content.Header>
					<h1 className='addressDetails__h1'>
						Address Details <span className='addressDetails__h1-span'> {sybStringAddress}</span>
						<button className='addressDetails__h1-btn' onClick={copyConten}>
							<ContentCopy />
						</button>
					</h1>
					<div className='addressDetails__section'>
						<div className='addressDetails__info'>
							<OveralBalance token={'1,173,586.35'} amount={'21,067.61184460'} />
							<Token />
						</div>
					</div>
				</Content.Header>
				<Content.Body>
					<Tabs data={addressData} setTransactionType={setTransactionType} />
				</Content.Body>
			</section>
		</Content>
	);
};
