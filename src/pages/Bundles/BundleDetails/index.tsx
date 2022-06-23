import useSortData from 'hooks/useSortData';
import { useParams } from 'react-router-dom';
import { getBundleData } from 'services/bundle.service';

const BundleDetails = () => {
  const { address } = useParams();
  const { ref, renderData, loading } = useSortData(getBundleData, address);

  console.log(renderData);

  return (
    <>
      <div>BundleDetails</div>
    </>
  );
};

export default BundleDetails;
