import { LOAD_TEST, TestAction, UPDATE_LOADING } from '../models/testModel';
import { Dispatch } from "react";
import { data } from '../reducers/testReducer';


// getData is a function from client.api, it is called to get the data using axios
type response = {
    data: data,
    succeeded: boolean,
    messages: string
}
var res: response = {
    data: {
        name: 'ahmad',
        age: 10
    },
    succeeded: true,
    messages: 'get data'
}
export const loadTestData = (onSuccess?: () => void | Promise<void>) => {
    return async (dispatch: Dispatch<TestAction>) => {
        try {
            dispatch({ type: UPDATE_LOADING, payload: true });

            // let res = await getData();
            if (res.succeeded) {
                dispatch({ type: LOAD_TEST, payload: res.data });
                onSuccess && await onSuccess();
            }
            else {
                console.log(res.messages ?? "");
            }

        } catch (error) {
            console.log(error);
        }
        finally {
            dispatch({ type: UPDATE_LOADING, payload: false });
        }
    };
};
