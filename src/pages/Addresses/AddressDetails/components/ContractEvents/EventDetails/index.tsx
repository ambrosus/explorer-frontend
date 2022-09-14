import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getContractData } from 'services/contract.service';

const EventDetails = () => {
  const [contractAbi, setContractAbi] = useState<any>([]);
  const { address = '' } = useParams();

  const { data: contractData, isSuccess } = useQuery(
    `events data ${address}`,
    () => getContractData(address),
  );

  const files = contractData?.data?.files || [];
  const status = contractData?.status || '';

  useEffect(() => {
    if (status === 200) {
      const res = files.find((file: any) => file.name === 'metadata.json');
      const parsedContent = JSON.parse(res?.content);

      setContractAbi(parsedContent.output.abi);
    }
  }, [isSuccess]);

  let provider = new ethers.providers.JsonRpcProvider(
    process.env.REACT_APP_EXPLORER_NETWORK,
  );

  const contract = new ethers.Contract(address, contractAbi, provider);

  console.log(contract);

  return (
    <>
      <div>EventDetails</div>
    </>
  );
};

export default EventDetails;
