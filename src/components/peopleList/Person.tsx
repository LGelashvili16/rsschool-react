import classes from "./Person.module.css";

interface PersonProps {
  person: Record<string, unknown>;
}

const Person = ({ person }: PersonProps) => {
  return (
    <div className={classes["person"]}>
      <h2>{person.name as string}</h2>
      <p>Eye Color: {person.eye_color as string}</p>
      <p>Height: {person.height as string}cm</p>
      <p>Mass: {person.mass as string}Kg</p>
      <p>Birth Year: {person.birth_year as string}</p>
    </div>
  );
};

export default Person;
