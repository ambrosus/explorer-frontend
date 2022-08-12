import WarningAmber from 'assets/icons/WarningAmber';
import { memo } from 'react';

const ContractErrorMessage = ({ errMessage }: any) => {
  return (
    <>
      <div className="contract_error_message">
        <WarningAmber />
        {errMessage}
      </div>
    </>
  );
};

export default memo(ContractErrorMessage);
