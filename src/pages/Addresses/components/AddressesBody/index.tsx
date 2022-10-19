import { Currency } from '../../../../components/UI/Currency';
import Amb from 'assets/icons/Cryptos/Amb';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { AddressesBodyProps } from 'pages/Addresses/addresses.interface';
import IsContract from 'pages/Addresses/components/IsContract';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { displayAmount } from 'utils/helpers';

const AddressesBody: FC<AddressesBodyProps> = ({
  address = '',
  balance = 0,
  rank = 0,
  isContract = false,
  txCount = 0,
  lastCardRef,
}) => {
  const { data: appData } = useTypedSelector((state: any) => state.app);

  const totalSupply = appData && appData.tokenInfo.total_supply;
  const ambBalance = balance && balance.ether ? balance.ether : 0;
  const holdingPercentage = (ambBalance / totalSupply) * 100;
  return (
    appData &&
    address && (
      <div className="addresses_body_cells" ref={lastCardRef}>
        <div className="addresses_body_cell">{rank}</div>

        <NavLink
          to={`/address/${address}/`}
          className="addresses_body_cell universall_light2"
        >
          <ReactTooltip
            id="centered-tooltip"
            effect="solid"
            place="bottom"
            backgroundColor="#808A9D"
          />
          {isContract && (
            <div
              data-tip="Contract"
              data-for="centered-tooltip"
              className="is-contract"
            >
              <IsContract />
            </div>
          )}
          {address}
        </NavLink>
        <div className="addresses_body_cell">{txCount || 0}</div>
        <div className="addresses_body_cell">
          <Amb />
          <span className="addresses_body_cell_icon">AMB</span>
          <Currency value={displayAmount(ambBalance) || 0} symbol=" " />
        </div>

        <div className="addresses_body_cell">
          {(holdingPercentage || 0).toFixed(2)} %
        </div>
      </div>
    )
  );
};

export default AddressesBody;
