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
import { shallowEqual } from 'react-redux';
import { formatEther } from 'ethers/lib/utils';

export const AddressDetails = () => {
	const { address, type, filtered, tokenToSorted }: any = useParams();
	const { setPosition, addFilter } = useActions();
	const { filters } = useTypedSelector((state: any) => state.tokenFilters, shallowEqual);
	const { loading, data: addressData } = useTypedSelector((state: any) => state.position);
	const [transactionType, setTransactionType] = useState<any>(type);
	const [selectedToken, setSelectedToken] = useState<any>(null);
	const [tx, setTx] = useState([]);

	useEffect(() => {
		if (filtered && addressData?.tokens?.length) {
			addFilter(addressData.tokens.find((token: any) => token.idx === +filtered));
		}
		if (!loading) {

			setPosition(API.getDataForAddress, address.trim(), {
				filtered: addressData && addressData.filters ? addressData.filters : [],
				selectedTokenFilter: selectedToken && selectedToken?.idx ? selectedToken.idx : filtered,
				limit: 500,
				type: transactionType,
			});
		}
	}, [filters, transactionType, selectedToken, tokenToSorted, address, type]);

	useEffect(() => {
		if (addressData && addressData?.transactions) {
			setTx(addressData.transactions);
		} else {
			setTx([]);
		}
	}, [addressData]);

	useEffect(() => {
		if (addressData && addressData?.tokens && !selectedToken) {
			setSelectedToken(addressData.tokens.find((token: any) => token.idx === +filtered));
		}
	}, [addressData]);

	const copyConten = () => navigator.clipboard.writeText(address);

	return (
		<Content>
			<section className='addressDetails'>
				<Content.Header>
					<h1 className='addressDetails__h1'>
						Address Details <span className='addressDetails__h1-span'> {address}</span>
						<button className='addressDetails__h1-btn' onClick={copyConten}>
							<ContentCopy />
						</button>
					</h1>
					<div className='addressDetails__section'>
						<div className='addressDetails__info'>
							<OveralBalance
								addressBalance={addressData && addressData.balance ? Number(formatEther(addressData.balance)).toFixed(2) : 0}
							/>

							<Token selectedToken={selectedToken} onClick={setSelectedToken} />
						</div>
						{selectedToken && <FilteredToken setSelectedToken={setSelectedToken} selectedToken={selectedToken} />}
					</div>
				</Content.Header>
				<Content.Body isLoading={Boolean(tx && tx.length)}>
					{tx && tx.length && (
						<Tabs
							onClick={setSelectedToken}
							selectedToken={selectedToken}
							transactionType={transactionType}
							data={tx}
							setTransactionType={setTransactionType}
						/>
					)}
				</Content.Body>
			</section>
		</Content>
	);
};
