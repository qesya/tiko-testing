import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk} from '../index';

export interface ITestState {
  loading: boolean;
}

const initialState: ITestState = {
  loading: false,
};

const appSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setLoading: (state, {payload}: PayloadAction<boolean>) => {
      state.loading = payload;
    },
  },
});

export const {setLoading} = appSlice.actions;

export default appSlice.reducer;

// ACTION
export const getAppVersion = (): AppThunk => {
  return async dispatch => {
    dispatch(setLoading(true));
    try {
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
    }
  };
};

// SELECTOR
export const appSelector = (state: {testStore: ITestState}) => state.testStore;
