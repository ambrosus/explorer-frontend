import ChevronDown from '../../components/icons/chevron-down-icon';
import { Listbox } from '@headlessui/react';
import { useState } from 'react';

const rangeList = [10, 50, 100, 200];

export function RangeList({ table }: { table: any }) {
  const [pageSize, setPageSize] = useState(
    table.getState().pagination.pageSize,
  );

  return (
    <div className="relative">
      <Listbox
        value={pageSize}
        onChange={(value) => {
          setPageSize(value);
          table.setPageSize(value);
        }}
      >
        {() => (
          <>
            <Listbox.Button className="flex w-[90px] flex-1 items-center text-base font-medium justify-between border border-solid border-black-600/10 rounded-4xl bg-white px-4 py-2.7 text-black-700">
              {pageSize}
              <ChevronDown className="ml-2" />
            </Listbox.Button>
            <Listbox.Options className="absolute w-full right-0 pt-2 pb-2 z-10 mt-2 rounded-xl origin-top-right bg-white border border-solid border-black-600/10">
              {rangeList.map((value) => (
                <Listbox.Option key={value} value={value}>
                  {({ selected }) => (
                    <div
                      className={`block cursor-pointer px-4 py-2 text-base font-medium text-gray-900 transition ${
                        selected ? 'bg-black-600/10' : 'hover:bg-black-600/10'
                      }`}
                    >
                      {value}
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </>
        )}
      </Listbox>
    </div>
  );
}
