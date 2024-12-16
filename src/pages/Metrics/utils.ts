import { DataObjectTVL } from './types';

function convertSecondsToMillis(seconds: number) {
  return seconds * 1000;
}

export function transformData({ data }: any) {
  if (!data) {
    return [];
  }

  return data.map((item: any) => [
    convertSecondsToMillis(item.timestamp),
    Number(item.value),
  ]);
}

export function transformDataTVL({ data }: { data: DataObjectTVL[] }) {
  if (!data) {
    return [];
  }

  return data.map((item) => [
    convertSecondsToMillis(item.timestamp),
    Number(item.values[0]),
    Number(item.values[1]),
  ]);
}
