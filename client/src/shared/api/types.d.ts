type Token = string;

type AxiosThunkAPI = {
  dispatch: AppDispatch;
  state: State;
  extra: import('axios').AxiosInstance;
}
