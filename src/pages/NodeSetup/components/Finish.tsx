import warning from '../../../assets/svg/warning.svg';
import CommandText from './CommandText';
import FAQ from './FAQ';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const faqs = [
  {
    title: 'What’s node address?',
    text: 'The node address is the wallet address you use to set up a node. We recommend using a new wallet address. You can use a separate аddress for all the transactions required when managing the node, so you don’t need to store any funds in the node address.',
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

const Finish = () => {
  const { nodeAddress } = useParams();
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    console.log(nodeAddress);
    const dataFromStorage = localStorage.getItem('nodeSetup');

    if (dataFromStorage) {
      const parsedData = JSON.parse(dataFromStorage);

      if (nodeAddress && parsedData[nodeAddress]) {
        setFormData(parsedData[nodeAddress].formData);
      }
    }
  }, []);

  return (
    <div className="node-setup container">
      <div className="white-container white-container_transparent">
        <h3 className="node-setup__title">Launch a validator node</h3>
        <p className="node-setup__text node-setup__text_height">
          <b>Your node isn't live yet.</b> Run the command in your server
          console to finish launching your node. Our{' '}
          <a className="blue-link" href="/">
            step-by-step guide
          </a>{' '}
          helps you through the required actions.
        </p>
        <p className="node-setup__text node-setup__text_height">
          You will be able to change the stake size or node owner address later
          on the node dashboard page.
        </p>
        <CommandText />
        <div className="node-check">
          <div className="node-check__item">
            <p className="node-check__label">Node address</p>
            <p className="node-check__value">{formData.nodeAddress}</p>
          </div>
          <div className={`node-check__item`}>
            <p className="node-check__label">Node owner address</p>
            <p className="node-check__value">{formData.nodeOwner}</p>
          </div>
          <div className="node-check__item">
            <p className="node-check__label">Node rewards recipient</p>
            <p className="node-check__value">{formData.receiveAddress}</p>
          </div>
          <div className="node-check__item">
            <p className="node-check__label">Stake amount</p>
            <p className="node-check__value">
              {formData.stake && (+formData.stake).toLocaleString()} AMB
            </p>
          </div>
        </div>
        <FAQ list={faqs} />
      </div>
    </div>
  );
};

export default Finish;
