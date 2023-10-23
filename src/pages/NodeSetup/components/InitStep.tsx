import FAQ from './FAQ';
import React from 'react';

const faqs = [
  {
    title: 'What’s node address?',
    text: 'Wallet you  to use to set up a node. We recommend using a new wallet address. You can use a separate address for all the transactions required when managing the node, so you don’t need to store any funds in the node address.',
  },
  {
    title: 'What’s node address?',
    text: 'Wallet you  to use to set up a node. We recommend using a new wallet address. You can use a separate address for all the transactions required when managing the node, so you don’t need to store any funds in the node address.',
  },
  {
    title: 'What’s node address?',
    text: 'Wallet you  to use to set up a node. We recommend using a new wallet address. You can use a separate address for all the transactions required when managing the node, so you don’t need to store any funds in the node address.',
  },
  {
    title: 'What’s node address?',
    text: 'Wallet you  to use to set up a node. We recommend using a new wallet address. You can use a separate address for all the transactions required when managing the node, so you don’t need to store any funds in the node address.',
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
