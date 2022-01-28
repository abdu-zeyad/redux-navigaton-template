import { ReduxState } from "../../types/redux";
import { LOAD_TEST, ON_ERROR, TestAction, UPDATE_LOADING } from '../models/testModel';

// any is a type the is coming from the api.client

export type TestState = {
} & ReduxState<any>;

const initialState: TestState = {
    data: {} as any,
    error: undefined,
    isLoading: false,
}


const testReducer = (state = initialState, action: TestAction): TestState => {
    switch (action.type) {
        case LOAD_TEST:
            return {
                ...state,
                data: action.payload,
            };

        case UPDATE_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        case ON_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state
    }
}

export { testReducer }