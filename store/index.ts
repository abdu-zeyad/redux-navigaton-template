export interface StateActionResult<TType, TData = any> {
    type: TType;
    payload: TData;
}

export * from './rootStore';
export * from './reducers';