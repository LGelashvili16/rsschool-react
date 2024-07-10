import classes from "./PeopleList.module.css";
import Person from "./Person";

interface PeopleListProps {
  people: Record<string, unknown>[];
}

const PeopleList = ({ people }: PeopleListProps) => {
  return (
    <section className={classes["people-list-wrapper"]}>
      <h2>Search Results</h2>
      {people.length === 0 && <h3>No result</h3>}
      <div className={classes["people-list"]}>
        {people.map((person) => {
          return <Person key={person.url as string} person={person} />;
        })}
      </div>
    </section>
  );
};

export default PeopleList;
