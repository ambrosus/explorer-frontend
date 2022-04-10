import {combineReducers} from "redux";
import appReducer from "./appReducer";
import positionReducer from './positionReducer';

const reducers = combineReducers({
    app: appReducer,
    position: positionReducer,
})

export default reducers

export type RootState = ReturnType<typeof reducers>;
