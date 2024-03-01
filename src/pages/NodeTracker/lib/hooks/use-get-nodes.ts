import { getApollos } from '../../services/apollo.service';
import { INode, IApolloNode } from '../../types';
import { useState, useEffect } from 'react';

const useGetNodes = (incomeNodes: INode[]) => {
  const [nodes, setNodes] = useState<INode[]>([]);
  const [apollosNodes, setApollosNodes] = useState<IApolloNode[]>([]);

  useEffect(() => {
    if (apollosNodes.length > 0 && incomeNodes.length > 0) {
      const result: any = apollosNodes.map((node) => {
        const matchingObj = incomeNodes.find((incomeNode) => {
          return (
            incomeNode.id.replace('apollo', '').toLowerCase() ===
            node.address.toLowerCase()
          );
        });

        if (matchingObj) {
          return { ...matchingObj, stake: node.stake };
        }
        return node;
      });

      const filteredResult = result.filter((item: any) => item.info?.name);

      if (filteredResult.length > 0) {
        setNodes(filteredResult);
      }
    }
  }, [apollosNodes, incomeNodes]);

  useEffect(() => {
    (async function () {
      try {
        const response = await getApollos({
          sort: 'totalBundles',
          page: '',
          limit: 200,
        });
        if (response?.data) {
          setApollosNodes(response.data);
        }
      } catch (e) {
        console.error('Error while getApollos: ', e);
      }
    })();
  }, []);

  return { nodes };
};

export default useGetNodes;
