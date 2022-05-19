import { useTypedSelector } from 'hooks/useTypedSelector';
import { numWithCommas } from 'utils/helpers';

const MainInfoAddresses = () => {
  const { data: appData } = useTypedSelector((state: any) => state.app);

  const totalAddresses: number =
    appData && numWithCommas(appData.netInfo.accounts.total);
  const holders: number =
    appData && numWithCommas(appData.netInfo.accounts.withBalance);
  return (
    <div className="addressesHeader">
      <h1 className="addressesHeader__heading">Addresses</h1>
      <div className="addressesHeader__table">
        <div className="addressesHeader__cells">
          <div className="addressesHeader__cell">Total addresses</div>
          <div className="addressesHeader__cell">{totalAddresses}</div>
        </div>
        <div className="addressesHeader__cells">
          <div className="addressesHeader__cell">Holders</div>
          <div className="addressesHeader__cell">{holders}</div>
        </div>
      </div>
    </div>
  );
};

export default MainInfoAddresses;
