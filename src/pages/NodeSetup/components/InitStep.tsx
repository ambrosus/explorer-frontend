import React from "react";

interface InitStepProps {
  handleNextClick: () => {}
}

const InitStep = ({ handleNextClick }: InitStepProps) => {
  return (
    <div className="white-container">
      <p className="white-container__step">Step 0</p>
      <h3 className="white-container__heading">
        Welcome to the launch a validator node
      </h3>
      <p className="white-container__text">What’s node address</p>
      <p className="white-container__text">What’s node owner address</p>
      <button
        className="white-container__button white-container__button_white"
        onClick={handleNextClick}
      >
        Start
      </button>
    </div>
  );
};

export default InitStep;
