import React, { useMemo } from 'react';

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
  const btnText = useMemo(() => {
    if (formData.nodeOwner && formData.nodeOwner !== account) {
      return 'Change address';
    } else if (formData.nodeAddress === account) {
      return 'Continue with the same address';
    } else {
      return 'Continue';
    }
  }, [account, formData]);

  return (
    <div className="white-container">
      <p className="white-container__step">Step 2</p>
      <h3 className="white-container__heading">Specify the node owner</h3>
      <p className="white-container__text">
        We recommend specifying a different wallet address for managing your
        node. This will increase the security of your node.{' '}
      </p>
      <p className="white-container__text">
        Select a different address in your MetaMask browser extension or
        continue with the connected address. You can change the node owner
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
        {btnText}
      </button>
    </div>
  );
};

export default NodeOwner;
