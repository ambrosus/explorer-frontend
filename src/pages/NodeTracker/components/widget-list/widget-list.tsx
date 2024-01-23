import Loader from '../../components/ui/loader';
import { IContinentItem } from '../../types';
import List from './list';

const WidgetList = ({
  data,
  isLoading,
}: {
  data: IContinentItem[];
  isLoading: boolean;
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <span className="text-3 leading-5 uppercase font-medium text-neutral-100">
          Continent
        </span>
        <span className="text-3 leading-5 uppercase font-medium text-neutral-100">
          AMB Staked
        </span>
      </div>
      <div className="flex items-center justify-center min-h-[155px]">
        {isLoading ? (
          <Loader variant="scaleUp" />
        ) : (
          data.length > 0 && <List data={data} />
        )}
      </div>
    </div>
  );
};

export default WidgetList;
