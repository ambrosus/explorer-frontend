import {
  PAddressesSort,
  TAddressesSortProps,
} from 'pages/Addresses/addresses.interface';
import { FC } from 'react';

const AddressesSort: FC<PAddressesSort> = ({ setRenderData,sortTerm, setSortTerm }) => (
  <div className="addresses_sort">
    <div className="addresses_sort_heading">Addresses</div>
    <div className="addresses_sort_cells">
      <div className="addresses_sort_cell">Sort by</div>
      {sortOptions.map((option, index) => (
        <div
          key={index}
          className={`addresses_sort_cell pointer ${
            option.value === sortTerm && 'addresses_sort_active'
          }`}
          onClick={() => {
            if (option.value === 'contracts') {
              setRenderData(null)
            }
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
  {
    label: 'Contracts',
    value: 'contracts',
  },
];
