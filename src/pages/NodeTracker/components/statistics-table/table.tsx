import Pagination from '../../components/statistics-table/pagination';
import Loader from '../../components/ui/loader';
import Scrollbar from '../../components/ui/scrollbar';
import { useData } from '../../contexts/data/use-data';
import { INode } from '../../types';
import columns from './columns';
import TableHeader from './header';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { useState, useEffect } from 'react';

const StatisticsTable = () => {
  const { nodes } = useData();
  const [currentNodes, setCurrentNodes] = useState<INode[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (nodes.length > 0) {
      setCurrentNodes(nodes);
      setIsLoading(false);
    }
  }, [nodes]);

  const onSearchHandler = (value: string) => {
    const result = nodes.filter((node) => {
      if (node?.id) {
        return (
          node.id
            .replace('apollo', '')
            .toLowerCase()
            .indexOf(value.toLowerCase()) > -1
        );
      }
    });
    setCurrentNodes(result);
  };

  const table = useReactTable({
    data: currentNodes,
    // @ts-ignore
    columns,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const pageCount = Math.ceil(
    currentNodes.length / table.getState().pagination.pageSize,
  );

  return (
    <div className="flex flex-col">
      <TableHeader searchHandler={onSearchHandler} table={table} />
      <Scrollbar style={{ width: '100%' }} autoHide="never">
        <table className="min-w-full w-full mb-5 whitespace-nowrap">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="py-3 px-4 uppercase text-left text-xs leading-5 font-medium text-neutral-100"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-black-600/5 transition-all border-t-1 border-solid border-t-black-200"
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        className="py-3 px-4 text-left text-sm leading-7 font-normal text-black-500"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : isLoading ? (
              <tr>
                <td colSpan={12}>
                  <div className="mx-auto max-w-[100px] my-10">
                    <Loader variant="scaleUp" />
                  </div>
                </td>
              </tr>
            ) : (
              <tr>
                <td
                  colSpan={12}
                  className="py-3 px-4 text-center text-base leading-7 font-normal text-neutral-300"
                >
                  Not found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Scrollbar>
      <Pagination table={table} pageCount={pageCount} />
    </div>
  );
};

export default StatisticsTable;
