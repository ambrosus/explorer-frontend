import { FC } from 'react';

interface DataTitleProps {
  title: string;
}

const DataTitle: FC<DataTitleProps> = ({ title }) => (
  <div className="blocks_sort">
    <div className="blocks_sort_heading">{title}</div>
  </div>
);

export default DataTitle;
