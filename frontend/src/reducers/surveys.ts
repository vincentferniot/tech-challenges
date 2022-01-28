import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSurveys, fetchSurveyByCode } from '../api';
export interface Survey {
    name: string;
    code: string;
}

export interface SurveysState {
    list: Survey[];
    status: 'idle' | 'loading' | 'failed';
}

const initialState: SurveysState = {
    list: [],
    status: 'idle',
};

export const surveysSlice = createSlice({
    name: 'surveys',
    initialState,
    reducers: {},
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
  async (code: string) => {
    const res = await fetchSurveyByCode(code);
    console.log(res.data);
    return res.data;
  }
);

// export const {} = surveysSlice.actions;

export default surveysSlice.reducer;
