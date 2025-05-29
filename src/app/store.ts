
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import {  recipeApi} from '../services/recipeApi';
import {setupListeners} from '@reduxjs/toolkit/query'
import { modalSlice } from './features/modalSlice';
import { useDispatch, useSelector } from 'react-redux';

const rootReducer = combineSlices(recipeApi, modalSlice)

export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      recipeApi.middleware,
    ]),
});

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

setupListeners(store.dispatch)