import React, { useEffect, useState } from 'react';
import { Content } from '../../../components/Content';
import { useParams } from 'react-router-dom';
import ContentCopy from '../../../assets/icons/ContentCopy';
import API from '../../../API/api';
import OveralBalance from '../../../components/OveralBalance';
import AddressBlock from '../../../components/AddressBlocks';
import AddressBlocksHeader from '../../../components/AddressBlocksHeader';
import ViewMoreBtn from '../../../components/ViewMoreBtn';

import Token from '../../../components/Token';

import ExportCsv from '../../../components/ExportCsv';
import { ethers, providers } from 'ethers';
import { formatEther } from 'ethers/lib/utils';

const transactionFilters = [
	{ title: 'All', value: '' },
	{ title: 'Transfers', value: 'transfers' },
	{ title: 'Block Rewards', value: 'block_rewards' },
	{ title: 'ERC-20 Tx', value: 'ERC-20_Tx' },
];

export const AddressDetails = () => {
	const { address } = useParams();
	const [transactionType, setTransactionType] = useState('');
	const [addressData, setAddressData] = useState<any>(null);

	// const { ethereum }: any = window;

	const reciveAdress = '0xF977814e90dA44bFA03b6295A0616a897441aceC';
	const copyConten = () => console.log(reciveAdress);


	useEffect(() => {
		if (address) {
			API.getDataForAddress(address.trim(), { limit: 50, type: transactionType }, setAddressData);
		}
	}, [address, transactionType]);
	console.log('addressData', addressData);

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
					<div className='addressDetails__section'>
						<div className='addressDetails__info'>
							<OveralBalance token={'1,173,586.35'} amount={'21,067.61184460'} />
							<Token />
						</div>
					</div>
				</Content.Header>
				<Content.Body>
					<section className='addressDetails__button'>
						{transactionFilters.map(({ value, title }) => (
							<button key={value} onClick={() => setTransactionType(value.toLowerCase())}>
								{title}
							</button>
						))}
						<ExportCsv />
					</section>

					<section className='addressDetails__table'>
						<AddressBlocksHeader
							txhash='txHash'
							method='Method'
							from='From'
							to='To'
							date='Date'
							block='Block'
							amount='Amount'
							txfee='txFee'
						/>

						<AddressBlock
							txhash='0xfad804b6f81b...6aa121c5485b'
							method='Transfer'
							from='0x9012...328eb'
							to='0x9012...328eb'
							date='1 min ago'
							block='10986508'
							amount='1.33345 ETH'
							txfee='Pending'
						/>
						<AddressBlock
							txhash='0xfad804b6f81b...6aa121c5485b'
							method='Transfer'
							from='0x9012...328eb'
							to='0x9012...328eb'
							date='1 min ago'
							block='10986508'
							amount='1.33345 ETH'
							txfee='0.000105 AMB'
						/>
					</section>
					<div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
						<ViewMoreBtn nameBtn='Load More' />
					</div>
				</Content.Body>
			</section>
		</Content>
	);
};
