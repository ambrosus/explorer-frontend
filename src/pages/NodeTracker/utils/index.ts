import { IContinentItem, ICountryNode, IGeoNode, INode } from '../types';
import _ from 'lodash';

export const calculateContinentStake = (
  mapData: any,
  stakeData: ICountryNode[],
) => {
  const result: IContinentItem[] = [];

  stakeData.forEach((data) => {
    const geometry = mapData.objects.default.geometries.find(
      (geo: any) => geo.properties['hc-key'] === data.key,
    );

    if (geometry) {
      const continent = geometry.properties['continent'];
      if (continent) {
        const existingObject = result.find(
          (item) => item.continent === continent,
        );

        if (existingObject) {
          existingObject.stakeSizes += data.stake;
        } else {
          result.push({ continent, stakeSizes: data.stake });
        }
      }
    }
  });

  return result.sort((a, b) => +b.stakeSizes - +a.stakeSizes);
};

export function getGeos(nodes: INode[]) {
  const result: IGeoNode[] = [];
  const countMap: Map<string, { stake: number; count: number }> = new Map();

  nodes.forEach((node) => {
    const lat = _.get(node, 'geo.ll', [])[0];
    const lon = _.get(node, 'geo.ll', [])[1];
    const key = `${lat}-${lon}`;

    if (!countMap.has(key)) {
      countMap.set(key, { stake: _.get(node, 'stake.ether'), count: 1 });
      result.push({
        color: '#0e1c3e',
        lat,
        lon,
        stake: _.get(node, 'stake.ether'),
        count: 1,
      });
    } else {
      const { stake, count } = countMap.get(key)!;
      countMap.set(key, {
        stake: stake + _.get(node, 'stake.ether'),
        count: count + 1,
      });

      const existingObject = result.find(
        (item) => item.lat === lat && item.lon === lon,
      );
      if (existingObject) {
        existingObject.count = count + 1;
        existingObject.stake = stake + _.get(node, 'stake.ether');
      }
    }
  });

  return result;
}

export const groupedByCountry = (nodes: INode[]) => {
  const modifyNodes = nodes.reduce((acc, obj) => {
    const country = obj?.geo?.country;
    const value = obj?.stake?.ether;

    if (!acc[country]) {
      acc[country] = {
        key: country?.toLowerCase() || '',
        value: 0,
        stake: 0,
      };
    }

    acc[country].stake += value;
    acc[country].value++;

    return acc;
  }, {} as Record<string, ICountryNode>);

  return modifyNodes;
};

export function formatEtherAmount(etherAmount: number) {
  if (etherAmount >= 1e6) {
    return (etherAmount / 1e6).toFixed(2) + 'M';
  } else if (etherAmount >= 1e3) {
    return (etherAmount / 1e3).toFixed(2) + 'K';
  } else {
    return etherAmount.toFixed(2);
  }
}

export function shortenAddress(address: string, chars = 8): string {
  return `${address.replace('apollo', '').slice(0, chars)}...${address.slice(
    address.length - chars,
  )}`;
}
