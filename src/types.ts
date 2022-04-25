import React from 'react';

export interface IRoute {
	path: string,
	key: string,
	exact: boolean,
	component: React.FC
}
