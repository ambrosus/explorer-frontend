import { useTypedSelector } from 'hooks/useTypedSelector';
import { numWithCommas } from 'utils/helpers';

const MainInfoAddresses = () => {
  const { data: appData } = useTypedSelector((state: any) => state.app);
  const totalAddresses: number = appData && numWithCommas(appData.netInfo.accounts.total);
  const holders: number = appData && numWithCommas(appData.netInfo.accounts.withBalance);

  return (
    <div className="main_info_addresses">
      <h1 className="main_info_addresses_heading">Addresses</h1>
      <div className="main_info_addresses_table">
        <div className="main_info_addresses_cells">
          <div className="main_info_addresses_cell">Total addresses</div>
          <div className="main_info_addresses_cell">{totalAddresses}</div>
        </div>
        <div className="main_info_addresses_cells">
          <div className="main_info_addresses_cell">Holders</div>
          <div className="main_info_addresses_cell">{holders}</div>
        </div>
      </div>
    </div>
  );
};

export default MainInfoAddresses;
