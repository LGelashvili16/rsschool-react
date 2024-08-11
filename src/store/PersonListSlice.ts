import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResultsInterface } from "../interfaces/interfaces";

export interface InitialStateInterface {
  personList: ResultsInterface[];
  selectedPersons: ResultsInterface[];
  currentPage: number;
  searchTerm: string;
}

const initialState: InitialStateInterface = {
  personList: [],
  selectedPersons: [],
  currentPage: 1,
  searchTerm: "",
};

const personListSlice = createSlice({
  name: "personList",
  initialState: initialState,
  reducers: {
    updatePersonList: (state, action: PayloadAction<ResultsInterface[]>) => {
      state.personList = action.payload;
    },
    updatePersonIsSelected: (
      state,
      action: PayloadAction<ResultsInterface>,
    ) => {
      const existingPerson = state.selectedPersons.find(
        (person) => person.name === action.payload.name,
      );

      if (existingPerson) {
        existingPerson.isSelected = action.payload.isSelected;
      } else {
        state.selectedPersons.push(action.payload);
      }
    },
    unselectAllPerson: (state) => {
      state.selectedPersons.length = 0;
    },
    updateCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    updateSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const personListActions = personListSlice.actions;

export default personListSlice;
