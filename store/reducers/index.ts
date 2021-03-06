import { combineReducers } from "redux";
import { testReducer } from "./testReducer";



export const rootReducer = combineReducers({
    test: testReducer,
});

export type RootState = ReturnType<typeof rootReducer>;