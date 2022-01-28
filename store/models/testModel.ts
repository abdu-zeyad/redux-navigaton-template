import { ReduxAction } from "../../types/reduxTypes";
import { data } from '../reducers/testReducer';

export const LOAD_TEST = "test/LOAD_TEST";
export const UPDATE_LOADING = "Test/UPDATE_LOADING";
export const ON_ERROR = "Test/ON_ERROR";

export type LoadTestAction = ReduxAction<typeof LOAD_TEST, data>
export type LoadingAction = ReduxAction<typeof UPDATE_LOADING, boolean>
export type ErrorAction = ReduxAction<typeof ON_ERROR, string | undefined>

export type TestAction =
    LoadTestAction
    | LoadingAction
    | ErrorAction;