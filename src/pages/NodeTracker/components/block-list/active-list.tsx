import InfoSmallIcon from '../../components/icons/info-small-icon';
import { useData } from '../../contexts/data/use-data';
import { avgTimeFilter, gasPriceFilter } from '../../lib/helpers/table';
import useGetBlockTime from '../../lib/hooks/use-get-block-time';
import ListItem from './list-item';
import { Tooltip } from '@airdao/ui-library';

const ActiveList = () => {
  const { apolloInfo, bestStats, latency } = useData();
  const avgBlockTime = useGetBlockTime();

  const gasPrice = bestStats && gasPriceFilter(bestStats.gasPrice);
  const gasLimit = bestStats && bestStats.block.gasLimit;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-5 gap-7 sm:gap-2 lg:gap-14 md:place-items-center">
      <ListItem
        title="Active Nodes"
        value={`${apolloInfo.online}/${apolloInfo.total}`}
      />
      <ListItem title="Gas Price" value={gasPrice} className="flex-col">
        <Tooltip
          isMultiline
          message="The fee required to process <br/> a blockchain transaction"
        >
          <InfoSmallIcon />
        </Tooltip>
      </ListItem>
      <ListItem title="Gas Limit" value={`${gasLimit} gas`}>
        <Tooltip
          isMultiline
          message="The limit on how much you can <br/> spend on a blockchain transaction"
        >
          <InfoSmallIcon />
        </Tooltip>
      </ListItem>
      <ListItem title="Page Latency" value={`${latency} ms`} />
      <ListItem title="Avg Block Time" value={avgTimeFilter(avgBlockTime)} />
    </div>
  );
};

export default ActiveList;
