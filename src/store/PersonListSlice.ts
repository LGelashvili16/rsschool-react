import { createSlice } from "@reduxjs/toolkit";
import { ResultsInterface } from "../interfaces/interfaces";

export interface InitialStateInterface {
  personList: ResultsInterface[];
  currentPage: number;
  searchTerm: string;
}

const initialState: InitialStateInterface = {
  personList: [],
  currentPage: 1,
  searchTerm: "",
};

const personListSlice = createSlice({
  name: "personList",
  initialState: initialState,
  reducers: {
    updatePersonList: (state, action) => {
      state.personList = action.payload;
    },
    updateCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    updateSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const personListActions = personListSlice.actions;

export default personListSlice;
