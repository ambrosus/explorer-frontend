import { IContinentItem } from '../../types';
import { formatEtherAmount } from '../../utils';

const ListItem = ({
  item,
  index,
}: {
  index: number;
  item: IContinentItem;
  className?: string;
}) => {
  const { continent, stakeSizes } = item;
  return (
    <li className="flex py-3 list-decimal list-inside items-center text-sm border-b-1 border-solid border-b-black-200 first:pt-0 last:pb-0 last:border-b-0">
      <span className="flex-1">
        {index + 1}
        <span className="ml-4">{continent}</span>
      </span>
      <span>{formatEtherAmount(stakeSizes)}</span>
    </li>
  );
};

export default ListItem;
