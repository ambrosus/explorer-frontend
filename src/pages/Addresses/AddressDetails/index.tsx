import React, { useEffect, useState } from 'react';
import { Content } from '../../../components/Content';
import { useParams } from 'react-router-dom';
import ContentCopy from '../../../assets/icons/ContentCopy';
import API from '../../../API/api';
import OveralBalance from '../../../components/OveralBalance';

import Token from '../../../components/Token';

import Tabs from '../../../components/Tabs';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import FilteredToken from '../../../components/FilteredToken';

export const AddressDetails = () => {
	const { address } = useParams();
	const { setPosition, clearFilters } = useActions();
	const { data: addressData, error: errorData } = useTypedSelector((state: any) => state.position);
	const [transactionType, setTransactionType] = useState('');
	const [selectedToken, setSelectedToken] = useState({});
	const [isShow, setIsShow] = useState(false);

	const sybStringAddress = `${address && address.slice(0, 10)}...${address && address.slice(address.length - 10)}`;

	const copyConten = () => setIsShow(!isShow);

	useEffect(() => {
		if (transactionType) {
			clearFilters();
		}
		if (address) {
			setPosition(API.getDataForAddress, address.trim(), { limit: 50, type: transactionType });
			if (errorData) {
				setPosition(API.getDataForAddress, address.trim(), { limit: 50, type: transactionType });
			}
		}
	}, [address, transactionType]);

	return (
		<Content isLoading={addressData}>
			{addressData !== null && addressData !== undefined && (
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
								<Token selectedToken={selectedToken} onClick={setSelectedToken} />
							</div>
							<FilteredToken />
						</div>
					</Content.Header>
					<Content.Body isLoading={addressData}>
						{addressData && <Tabs data={addressData} setTransactionType={setTransactionType} />}
					</Content.Body>
				</section>
			)}
		</Content>
	);
};
