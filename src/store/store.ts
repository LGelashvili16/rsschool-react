import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";
import personListSlice from "./PersonListSlice";
import personSlice from "./PersonSlice";

const store = configureStore({
  reducer: {
    personList: personListSlice.reducer,
    person: personSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
