import { Currency } from '../../../../components/UI/Currency';
import Amb from 'assets/icons/Cryptos/Amb';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { AddressesBodyProps } from 'pages/Addresses/addresses.interface';
import IsContract from 'pages/Addresses/components/IsContract';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import Tooltip from 'react-simple-tooltip';
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
      <tr className="addresses_body_cells" ref={lastCardRef}>
        <td>
          <div className="addresses_body_cell">{rank}</div>
        </td>
        <td>
          <NavLink
            rel="nofollow"
            to={`/address/${address}/`}
            className="addresses_body_cell universall_light2"
          >
            {isContract && (
              <div className="is-contract">
                <Tooltip
                  content="Is contract"
                  padding={6}
                  radius={10}
                  fontSize={10}
                  background="#808a9d"
                  color="white"
                  border="none"
                >
                  <IsContract />
                </Tooltip>
              </div>
            )}
            {address}
          </NavLink>
        </td>
        <td>
          <div className="addresses_body_cell">{txCount || 0}</div>
        </td>
        <td>
          <div className="addresses_body_cell">
            <Amb />
            <span className="addresses_body_cell_icon">AMB</span>
            <Currency value={displayAmount(ambBalance) || 0} symbol=" " />
          </div>
        </td>
        <td>
          <div className="addresses_body_cell">
            {(holdingPercentage || 0).toFixed(2)} %
          </div>
        </td>
      </tr>
    )
  );
};

export default AddressesBody;
