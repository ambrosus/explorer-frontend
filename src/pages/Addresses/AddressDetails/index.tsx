import React, { useEffect, useState } from 'react';
import { Content } from '../../../components/Content';
import { useParams } from 'react-router-dom';
import ContentCopy from '../../../assets/icons/ContentCopy';
import API from '../../../API/api';
import OveralBalance from '../../../components/OveralBalance';
import AddressBlock from '../../../components/AddressBlocks';
import AddressBlocksHeader from '../../../components/AddressBlocksHeader';
import ViewMoreBtn from '../../../components/ViewMoreBtn';
import TokenFiltered from '../../../components/TokenFiltered';
import erc20Abi from '../../../utils/abis/ERC20.json';
import TokenModal from '../../../components/TokenModal';
// import { ethers, providers } from 'ethers';
// import Web3 from 'web3';

const transactionFilters = [
	{ title: 'All', value: '' },
	{ title: 'Transfers', value: 'transfers' },
	{ title: 'Block Rewards', value: 'block_rewards' },
	{ title: 'ERC-20 Tx', value: 'ERC-20_Tx' },
];

export const AddressDetails = () => {
	const { address } = useParams();
	const [transactionType, setTransactionType] = useState('');

	const reciveAdress = '0xF977814e90dA44bFA03b6295A0616a897441aceC';
	const copyConten = () => console.log(reciveAdress);

	// @ts-ignore
	useEffect(() => {
		const getTransactionsData = async (add: string, params: { limit: any; type: any }) => {
			const { limit, type } = params;
			const transactionsData = await API.getAccountTx(add, { limit, type });

			const blockBookApi = await fetch(`https://blockbook.ambrosus.io/api/v2/address/${address}`).then((response) => response.json());

			console.log('blockBookApi', blockBookApi);
			console.table([
				['Transactions data', transactionsData.data],
				['Tokens', blockBookApi.tokens],
			]);
			console.log('abi', erc20Abi);
			// @ts-ignore
			console.log('provider', new providers.Web3Provider(window.ethereum).getSigner());
			console.log('blockBookApi.tokens[0].contract', blockBookApi.tokens[0].contract);
			// @ts-ignore
			// const web3 = new Web3(window.ethereum);
			// const contract = new web3.eth.Contract(erc20Abi, 	blockBookApi.tokens[0].contract);
			// @ts-ignore
			// const balance = await contract.balanceOf();

			// const tokenContract =await new ethers.Contract(
			// 	blockBookApi.tokens[0].contract,
			// 	erc20Abi,
			// new providers.Web3Provider(window.ethereum).getSigner());
			// const balance = await tokenContract.balanceOf();
			console.log('balance', balance);

			return transactionsData;
		};
		if (address) {
			getTransactionsData(address.trim(), { limit: 50, type: transactionType });
		}
	}, [address, transactionType]);

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
							<div className='addressDetails__info-token'>
								<div className='addressDetails__info-tokenName'>Token</div>
								<TokenFiltered />
							</div>
						</div>
						<TokenModal />
					</div>
				</Content.Header>
				<Content.Body>
					<section>
						{transactionFilters.map(({ value, title }) => (
							<button key={value} onClick={() => setTransactionType(value.toLowerCase())}>
								{title}
							</button>
						))}
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
