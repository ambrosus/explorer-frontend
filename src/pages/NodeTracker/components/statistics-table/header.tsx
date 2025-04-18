import { RangeList } from '../../components/statistics-table/filters';
import SearchInput from '../../components/ui/search-bar';
import { useData } from '../../contexts/data/use-data';
import { memo } from 'react';

const TableHeader = ({
  searchHandler,
  table,
}: {
  searchHandler: (value: string) => any;
  table: any;
}) => {
  const { apolloInfo } = useData();

  return (
    <div className="mb-8 flex flex-col sm:flex-row items-center justify-between">
      <div className="mb-8 sm:mb-0">
        <h4>A total of {apolloInfo.online} nodes</h4>
      </div>
      <div className="flex relative flex-col sm:flex-row flex-wrap items-center gap-4">
        <SearchInput handler={searchHandler} />
        <RangeList table={table} />
      </div>
    </div>
  );
};

export default memo(TableHeader);
