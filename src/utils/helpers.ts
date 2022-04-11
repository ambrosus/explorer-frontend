/* eslint-disable */
import moment from 'moment';

export const sliceData = (item: string) => `${item.slice(0, 5)}...${item.slice(item.length - 5)}`;
export const calcTime = (time: number) => moment(time * 1000).fromNow();
