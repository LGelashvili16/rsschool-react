import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResultsInterface } from "../interfaces/interfaces";

export interface InitialStateInterface {
  person: ResultsInterface[];
  searchedPerson: string;
}

const initialState: InitialStateInterface = {
  person: [],
  searchedPerson: "",
};

const personSlice = createSlice({
  name: "person",
  initialState: initialState,
  reducers: {
    updatePersonDetails: (state, action: PayloadAction<ResultsInterface[]>) => {
      state.person = action.payload;
    },
    updateSearchedPerson: (state, action: PayloadAction<string>) => {
      state.searchedPerson = action.payload;
    },
  },
});

export const personSliceActions = personSlice.actions;

export default personSlice;
