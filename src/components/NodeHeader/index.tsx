import { TParams } from '../../types';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

const NodeHeader = ({ children, getNodeData }: any) => {
  const { address }: TParams = useParams();
  const [node, setNode] = useState(null);
  const navigate = useNavigate();

  const { data, isError, isLoading } = useQuery(
    [`get data for ${address}`, address],
    () => getNodeData(address as string),
  );

  useEffect(() => {
    if (!isLoading) setNode(data?.data);
  }, [isLoading]);

  if (isError) navigate(`/notfound`);

  return <div className="apollo_details_header">{children({ node })}</div>;
};

export default NodeHeader;
