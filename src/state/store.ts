import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers/index";
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from "redux-logger";

const logger = createLogger({
	collapsed: true,
	diff: true,
	duration: true,
	timestamp: true,
	colors: {
		title: () => "#001da6",
		prevState: () => "#de6f0d",
		action: () => "#0050ff",
		nextState: () => "#1a9134",
	},
});

export const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(thunk,logger)))
