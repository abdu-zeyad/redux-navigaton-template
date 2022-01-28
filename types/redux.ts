export interface ReduxAction<TType, TData = undefined> {
    readonly type: TType;
    payload: TData;
}

export interface ReduxState<TData> {
    data: TData;
    error?: string;
    isLoading: boolean;
}