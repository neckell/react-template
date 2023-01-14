export const reducerState = {
  INIT: 'INIT',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

export const isInit = (status) => reducerState.INIT === status;
export const isSuccess = (status) => reducerState.SUCCESS === status;
export const isLoading = (status) => reducerState.LOADING === status;
export const hasError = (status) => reducerState.ERROR === status;

const initialState = {
  msgError: '',
  status: reducerState.INIT,
};

const ExampleReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default ExampleReducer;
