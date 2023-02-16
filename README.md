# AirDAO Network Explorer

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000/explorer](http://localhost:3000/explorer) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.\

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified
and the filenames include the hashes.\
Your app is ready to be deployed!

## Introduction 
In this web application you can explore addresses, transactions, mined blocks etc. in AirDAO blockchain. It containes a few pages which you can navigate from navbar.

...

## Main page
On the main page you can see basic info about blockchain such as total supply, mined block, price of our token AMB. Also you can track all the transactions  that was passed through AirDAO network in real time. 

...

## Apollo nodes
Here you can explore all the nodes in network, sort it by balance, address etc. You can click on address of the apollo node to get more information about it.

...

## Atlas nodes
This page is similar to apollo nodes, so you can explore some information about atlas that running on AirDAO network. Also you can click on address to get more info.

...

## Addresses
Here you can see all addresses in the network, sort it by balance and total transactions. You`ll see special label near address which indicates if the address is a smart contract. Also you can click on address to get more information about it. 

...

## Address details
On this page you will able to find all the transactions which were sent from this address or to this address. You can filter these txs by token. If the address is smart contract, you will see a contract tab. In the contract tab you can upload a contract to verify it, after that you will be able to submit methods of this smart contract which may be helpful.

...

## Blocks
The blocks page allows you to track in real time the blocks mining. Here you can find the address of validator (apollo node) which have mined the block, block hash and time when this block was mined. You can click on block number to get more information about it

...

## Transactions
Here you can see all the transactions in AirDAO network. You are able to filter them by type or you can check all information of the transaction by clicking on the transaction hash
