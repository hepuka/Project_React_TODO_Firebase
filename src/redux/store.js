import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import authReducer from "./slice/authSlice";
import getNumbersReducer from "./slice/getNumbers";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const reducer = combineReducers({
  auth: authReducer,
  getnumbers: getNumbersReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
