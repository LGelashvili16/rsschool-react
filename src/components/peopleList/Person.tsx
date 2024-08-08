import React from "react";
import classes from "./Person.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { personSliceActions } from "../../store/PersonSlice";
import { fixIdSpacing } from "../../utils/helper";
import { personListActions } from "../../store/PersonListSlice";
import { ResultsInterface } from "../../interfaces/interfaces";
import { useRouter } from "next/router";

interface PersonProps {
  person: ResultsInterface;
}

const Person = ({ person }: PersonProps) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const selectedPersons = useSelector(
    (state: RootState) => state.personList.selectedPersons,
  );

  const newPerson = selectedPersons.find(
    (personInList) => personInList.name === person.name,
  );

  const clickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(personSliceActions.updateSearchedPerson(person.name));

    const params = new URLSearchParams({ personName: person.name });
    router.push(`/home?${params.toString()}`, undefined, { shallow: true });
  };

  const formFieldsChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    const updatedPerson = { ...person };
    const isSelected = e.target.checked;

    updatedPerson.isSelected = isSelected;

    dispatch(personListActions.updatePersonIsSelected(updatedPerson));
  };

  return (
    <div className={classes["person"]}>
      <form className={classes["person-form"]}>
        <input
          type="checkbox"
          name={fixIdSpacing(person.name)}
          id={fixIdSpacing(person.name)}
          checked={newPerson && newPerson.isSelected ? true : false}
          onChange={formFieldsChangeHandler}
        />
      </form>
      <h2>{person.name as string}</h2>
      <p>Eye Color: {person.eye_color as string}</p>
      <p>Height: {person.height as string}cm</p>
      <p>Mass: {person.mass as string}Kg</p>
      <p>Birth Year: {person.birth_year as string}</p>

      <button className={classes["person-btn"]} onClick={clickHandler}>
        Open
      </button>
    </div>
  );
};

export default Person;
