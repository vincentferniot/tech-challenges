import { createSlice } from '@reduxjs/toolkit';
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
});

export default surveysSlice.reducer;
