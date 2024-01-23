import { IContinentItem } from '../../types';
import ListItem from './list-item';

const List = ({ data }: { data: IContinentItem[] }) => {
  return (
    <ol className="flex flex-col list-decimal w-full">
      {data.map((item, index) => (
        <ListItem key={item.continent} index={index} item={item} />
      ))}
    </ol>
  );
};

export default List;
