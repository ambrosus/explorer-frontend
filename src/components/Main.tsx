import { RenderRoutes } from 'components/RenderRoutes/RenderRoutes'
import { useActions } from 'hooks/useActions'
import React, { useEffect } from 'react'

import { Layout } from 'components/layouts/Layout'
import routes from 'routes'
import 'styles/Main.scss'

const Main: React.FC = () => {
	const { setAppDataAsync } = useActions()
	useEffect(() => {
		setAppDataAsync()
	}, [])
  return (
		<Layout>
			<RenderRoutes routes={routes} />
		</Layout>
	)
}

export default Main
