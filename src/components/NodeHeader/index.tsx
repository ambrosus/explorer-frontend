import { TParams } from '../../types';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const NodeHeader = ({ children, getNodeData }: any) => {
  const { address = '' }: TParams = useParams();
  const [node, setNode] = useState(null);
  const navigate = useNavigate();

  const { data, isError, isLoading } = useQuery({
    queryKey: [`get data for ${address}`, address],
    queryFn: () => getNodeData(address),
    enabled: !!address,
  });

  useEffect(() => {
    if (!isLoading)
      setNode(() => {
        if (data?.data) {
          return data.data;
        } else {
          navigate(`/notfound/`);
          return null;
        }
      });
  }, [isLoading]);

  if (isError) navigate(`/notfound/`);

  const res = node && children({ node });
  return res;
};

export default NodeHeader;
