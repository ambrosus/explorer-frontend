import moment from 'moment';
import { NavLinkProps } from 'react-router-dom';

export const sliceData5 = (item: string) => `${item.slice(0, 5)}...${item.slice(item.length - 5)}`;
export const sliceData10 = (item: string) => `${item.slice(0, 10)}...${item.slice(item.length - 10)}`;
export const calcTime = (time: number) => moment(time * 1000).fromNow();
export const setActiveLink = ((props: {
	isActive: boolean;
}): string | undefined => 'tabs__link ' + (props.isActive ? ' tabs__link-active' : ''));
