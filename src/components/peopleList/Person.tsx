import React from "react";
import classes from "./Person.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { personSliceActions } from "../../store/PersonSlice";

interface PersonProps {
  person: Record<string, unknown>;
}

const Person = ({ person }: PersonProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const clickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(personSliceActions.updateSearchedPerson(person.name));
  };
  return (
    <Link
      className={classes["person"]}
      to={`/home/${person.name}`}
      onClick={clickHandler}
    >
      <h2>{person.name as string}</h2>
      <p>Eye Color: {person.eye_color as string}</p>
      <p>Height: {person.height as string}cm</p>
      <p>Mass: {person.mass as string}Kg</p>
      <p>Birth Year: {person.birth_year as string}</p>
    </Link>
  );
};

export default Person;
