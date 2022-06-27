import BundleDetailsBody from '../BundleDetailsBody';
import useSortData from 'hooks/useSortData';
import { getBundleWithEntriesData } from 'services/bundle.service';

const BundleDetailsBlocks = () => {
  const { ref, renderData, loading } = useSortData(
    getBundleWithEntriesData,
    '',
  );
  return (
    <div>
      <BundleDetailsBody />
    </div>
  );
};

export default BundleDetailsBlocks;
