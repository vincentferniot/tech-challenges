import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import surveysReducer from '../reducers/surveys';

export const store = configureStore({
    reducer: {
        surveys: surveysReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;