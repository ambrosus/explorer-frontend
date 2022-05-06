import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actionCreators } from '../state'

export const useActions = () => {
	const dispatch = useDispatch()

	return bindActionCreators(actionCreators, dispatch)
}
/*
   @param {object} actionCreators
   @param {object} dispatch
   @returns {object}
*/
