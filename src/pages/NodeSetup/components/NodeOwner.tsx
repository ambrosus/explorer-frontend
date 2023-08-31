import React from 'react';

interface NodeOwnerProps {
  formData: any;
  account: string;
  handleOwnerAddress: () => {};
}

const NodeOwner = ({
  account,
  formData,
  handleOwnerAddress,
}: NodeOwnerProps) => {
  return (
    <div className="white-container">
      <p className="white-container__step">Step 2</p>
      <h3 className="white-container__heading">Specify the node owner</h3>
      <p className="white-container__text">
        We recommend to select a different address for managing a node carries.
        It will increase the safety level of your ‘project’.{' '}
      </p>
      <p className="white-container__text">
        Select different address in your Metamask browser extension or continue
        with the connected address. You will be able to change node owner
        address later on the node dashboard page.
      </p>
      <div>
        <p className="white-container__text">
          Node address: {formData.nodeAddress}
        </p>
        <p className="white-container__text">
          Current address:{' '}
          <span className="white-container__text-bold">{account}</span>
        </p>
      </div>
      <button
        className="white-container__button white-container__button_white"
        onClick={handleOwnerAddress}
      >
        {formData.nodeAddress === account
          ? 'Continue with the same address'
          : 'Continue'}
      </button>
    </div>
  );
};

export default NodeOwner;
