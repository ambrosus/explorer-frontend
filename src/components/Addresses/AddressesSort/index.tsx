import {
  PAddressesSort,
  TAddressesSortProps,
} from '../../../pages/Addresses/addresses.interface';
import { FC } from 'react';

const AddressesSort: FC<PAddressesSort> = ({ sortTerm, setSortTerm }) => (
  <div className="addresses__sort">
    <div className="addresses__sort-heading">Addresses</div>
    <div className="addresses__sort-cells">
      <div className="addresses__sort-cell">Sort by</div>
      {sortOptions.map((option, index) => (
        <div
          key={index}
          className={`addresses__sort-cell pointer ${
            option.value === sortTerm && 'addresses__sort-active'
          }`}
          onClick={() => {
            setSortTerm(option.value);
          }}
        >
          {option.label}
        </div>
      ))}
    </div>
  </div>
);

export default AddressesSort;

const sortOptions: TAddressesSortProps[] = [
  {
    label: 'Address',
    value: 'address',
  },
  {
    label: 'Balance',
    value: 'balance',
  },
  {
    label: 'Total Tx',
    value: 'totalTx',
  },
];
