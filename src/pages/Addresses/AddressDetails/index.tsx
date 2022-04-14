import React, { useCallback, useEffect, useState } from 'react';
import { Content } from '../../../components/Content';
import { useParams } from 'react-router-dom';
import ContentCopy from '../../../assets/icons/ContentCopy';
import API from '../../../API/api';
import OveralBalance from '../../../components/OveralBalance';

import Token from '../../../components/Token';

import Tabs from '../../../components/Tabs';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { shallowEqual } from 'react-redux';

export const AddressDetails = () => {
		const { address, type }: any = useParams();
		const { setPosition } = useActions();
		const { filters } = useTypedSelector((state: any) => state.tokenFilters, shallowEqual);
		const {
			loading,
			data: addressData,
			error: errorData,
		} = useTypedSelector((state: any) => state.position, shallowEqual);
		const [transactionType, setTransactionType] = useState<any>(type);
		const [selectedToken, setSelectedToken] = useState({ name: 'All', filterName: 'All' });
		const [tx, setTx] = useState([]);
		const sybStringAddress = `${address && address.slice(0, 10)}...${address && address.slice(address.length - 10)}`;
		console.log('selectedToken', selectedToken);
		useEffect(() => {
			if (!loading) {
				setPosition(API.getDataForAddress, address.trim(), {
					filters: addressData && addressData.filters ? addressData.filters : [],
					selectedTokenFilter: selectedToken.filterName,
					limit: 200,
					type: transactionType,
				});
			}
		}, [filters, transactionType]);

		useEffect(() => {
			if (addressData && addressData?.transactions) {
				setTx(addressData.transactions);
			} else {
				setTx([]);
			}
		}, [addressData]);

		const copyConten = () => console.log(sybStringAddress);

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
								<Token selectedToken={selectedToken} onClick={setSelectedToken} />
							</div>
							{/*это убрать потом*/}
							<div className='addressDetails__info'>
								addressData.transactions :{addressData && addressData.transactions && addressData.transactions.length}
							</div>
							{/*тут конец*/}
						</div>
					</Content.Header>
					<Content.Body isLoading={addressData}>
						{tx && <Tabs type={transactionType} data={tx} setTransactionType={setTransactionType} />}
					</Content.Body>
				</section>
			</Content>
		);
	}
;


