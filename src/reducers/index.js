import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import timelinepostReducer from "./timelinepostReducer";

// export const reducers = combineReducers({
//     auth: authReducer,

// })

export const reducers = combineReducers({authReducer, postReducer,timelinepostReducer})