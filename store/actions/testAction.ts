import { LOAD_TEST, TestAction, UPDATE_LOADING } from '../models/testModel';
import { Dispatch } from "react";


// getData is a function from client.api, it is called to get the data using axios

export const loadTestData = (onSuccess?: () => void | Promise<void>) => {
    return async (dispatch: Dispatch<TestAction>) => {
        try {
            dispatch({ type: UPDATE_LOADING, payload: true });

            // let res = await getData();
            let res: any
            if (res.succeeded) {
                dispatch({ type: LOAD_TEST, payload: res });
                onSuccess && await onSuccess();
            }
            else {
                console.log(res.messages?.join('\n') ?? "");
            }

        } catch (error) {
            console.log(error);
        }
        finally {
            dispatch({ type: UPDATE_LOADING, payload: false });
        }
    };
};
