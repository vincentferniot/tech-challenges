import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSurveys, fetchSurveyByCode } from '../api';
export interface Survey {
    name: string;
    code: string;
}

export interface SurveyData {
  type: 'qcm' | 'numeric' | 'date',
  label: string,
  result: any
  // result: number | string[] | {}
}
export interface SurveysState {
    list: Survey[];
    current: SurveyData[] | [];
    status: 'idle' | 'loading' | 'failed';
    search: string,
}

const initialState: SurveysState = {
    list: [],
    status: 'idle',
    current: [],
    search: 'cucou',
};

export const surveysSlice = createSlice({
    name: 'surveys',
    initialState,
    reducers: {
      changeSearchValue: (state, action) => {
        state.search = action.payload;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchSurveysAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchSurveysAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.list = action.payload;
        })
        .addCase(fetchSurveysAsync.rejected, (state) => {
          state.status = 'failed';
        })
        .addCase(fetchSurveyByCodeAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchSurveyByCodeAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.current = action.payload;
        })
        .addCase(fetchSurveyByCodeAsync.rejected, (state) => {
          state.status = 'failed';
        });
    },
});

export const fetchSurveysAsync = createAsyncThunk(
  'surveys/fetchAll',
  async () => {
    const res = await fetchSurveys();
    return res.data;
  }
);

export const fetchSurveyByCodeAsync = createAsyncThunk(
  'surveys/fetchByCode',
  async (code?: string) => {
    const res = await fetchSurveyByCode(code);
    return res.data;
  }
);

export const { changeSearchValue } = surveysSlice.actions;

export default surveysSlice.reducer;
