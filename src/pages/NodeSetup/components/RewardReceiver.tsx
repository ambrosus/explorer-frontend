import InputWithDropdown from "../Dropdown";
import Warning from "../Warning";
import React, {useState} from "react";
import {isValidEthereumAddress} from "../../../utils/helpers";

interface NodeOwnerProps {
  formData: any;
  handleNextClick: () => {};
  setFormData: (state: any) => {};
}

const RewardReceiver = ({ formData, handleNextClick, setFormData }: NodeOwnerProps) => {
  const [selectRewardError, setSelectRewardError] = useState(false);

  const setRewardAddress = (address: string) => {
    setSelectRewardError(false);
    setFormData((state: any) => ({
      ...state,
      receiveAddress: address,
    }));
  };

  const handleRewardAddress = () => {
    if (
      !formData.receiveAddress ||
      !isValidEthereumAddress(formData.receiveAddress)
    ) {
      setSelectRewardError(true);
    } else {
      handleNextClick();
    }
  };
  const closeRewardError = () => setSelectRewardError(false);

  return (
    <div className="white-container">
      <p className="white-container__step">Step 3</p>
      <h3 className="white-container__heading">Rewards receiver</h3>
      <p className="white-container__text">
        Select the address, that will receive your node rewards. You will be
        able to change address later on the node dashboard page.
      </p>
      <div className="white-container__dropdown-wrapper">
        <InputWithDropdown
          options={[formData.nodeAddress, formData.nodeOwner]}
          selectedOption={formData.receiveAddress}
          setSelectedOption={setRewardAddress}
        />
        <button
          className="white-container__button white-container__button_white"
          onClick={handleRewardAddress}
        >
          Confirm
        </button>
      </div>
      {selectRewardError && (
        <Warning onClose={closeRewardError}>Select reward address</Warning>
      )}
    </div>
  );
};

export default RewardReceiver;
