import React, { useEffect } from 'react';
import { Content } from '../../components/Content';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import API from '../../API/api';

export const Blocks = () => {
	const {setPosition} = useActions();
	const {loading, data , error} = useTypedSelector((state: any) => state.position)

	useEffect(() => {
			setPosition(API.getBlocks,{limit: 10});
	}, []);

	return (
		<Content>
			<Content.Header>
				<h1>Blocks</h1>
			</Content.Header>
			<Content.Body>
				<div>Blocks CONTENT</div>
			</Content.Body>
		</Content>
	);
}
