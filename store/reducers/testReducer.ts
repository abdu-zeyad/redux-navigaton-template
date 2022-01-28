import { ReduxState } from "../../types/reduxTypes";
import { LOAD_TEST, ON_ERROR, TestAction, UPDATE_LOADING } from '../models/testModel';


export type data = {
    name: string,
    age: number
}

export type TestState = {
} & ReduxState<data>;

const initialState: TestState = {
    data: {} as data,
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