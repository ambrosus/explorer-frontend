import React from 'react'
import ReduxToastr from 'react-redux-toastr'

const ReduxToastrLib = () => (
	<div>
		{/*// @ts-ignore*/}
		<ReduxToastr
			timeOut={4000}
			newestOnTop={false}
			preventDuplicates
			position="top-right"
			transitionIn="fadeIn"
			transitionOut="fadeOut"
			progressBar
			closeOnToastrClick
		/>
	</div>
)

export default ReduxToastrLib
