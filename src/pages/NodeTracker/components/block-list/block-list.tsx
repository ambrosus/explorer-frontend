import ListItem from '../../components/block-list/list-item';
import BoxIcon from '../../components/icons/box-icon';
import InfoSmallIcon from '../../components/icons/info-small-icon';
import ListIcon from '../../components/icons/list-icon';
import { useData } from '../../contexts/data/use-data';
import {
  blockTimeFilter,
  formatBestBlockNumber,
} from '../../lib/helpers/table';
import { Tooltip } from '@airdao/ui-library';

const BlockList = () => {
  const { bestBlock, lastBlock } = useData();

  return (
    <div className="grid grid-cols-2 gap-7 md:place-items-center w-full">
      <ListItem
        title="Block Height"
        value={formatBestBlockNumber(bestBlock)}
        icon={BoxIcon}
        className="gap-2"
      >
        <Tooltip
          isMultiline
          message="The current total number of blocks <br/> in the chain since the genesis block"
        >
          <InfoSmallIcon />
        </Tooltip>
      </ListItem>
      <ListItem
        title="Last Block"
        value={blockTimeFilter(lastBlock)}
        icon={ListIcon}
        className="gap-2"
      />
    </div>
  );
};

export default BlockList;
