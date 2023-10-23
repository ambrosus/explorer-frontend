import FAQ from './FAQ';
import React from 'react';

const faqs = [
  {
    title: 'What’s node address?',
    text: 'Wallet you  to use to set up a node. We recommend using a new wallet address. You can use a separate address for all the transactions required when managing the node, so you don’t need to store any funds in the node address.',
  },
  {
    title: 'What’s node owner address?',
    text: 'The node owner address is the wallet address you specify as the owner of the validator node, which is assigned to the node address. The node owner address manages the validator node and its node address. The node owner address receives the staking rewards.',
  },
  {
    title: 'What’s validator node?',
    text: 'Validator nodes approve transactions submitted to our blockchain by users. AirDAO validator nodes require AMB to be staked by the node owner. AirDAO’s blockchain protocol rewards validator node owners with AMB for providing transaction validation services to our network.',
  },
  {
    title: 'What’s stake?',
    text: 'AirDAO’s blockchain uses a ‘proof-of-stake’ consensus mechanism. Our blockchain validator nodes require a ‘stake’ of AMB to run. AMB is ‘staked’ by node owners in validator nodes that confirm blockchain transactions.',
  },
];

const InitStep = () => {
  return (
    <div>
      <FAQ list={faqs} />
    </div>
  );
};

export default InitStep;
