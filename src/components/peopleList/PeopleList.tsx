import classes from "./PeopleList.module.css";
import Person from "./Person";
import Pagination from "../Pagination";

const PeopleList = ({
  data,
  fetchPeople,
}: {
  data: {
    results: Record<string, unknown>[];
    previous: string | null;
    next: string | null;
  };
  fetchPeople: (endpoint?: string, term?: string) => void;
}) => {
  const previousClickHandler = () => {
    if (data.previous) {
      fetchPeople(data.previous);
    }
  };

  const nextClickHandler = () => {
    if (data.next) {
      fetchPeople(data.next);
    }
  };

  return (
    <div className={classes["people-list-wrapper"]}>
      <h2>Search Results</h2>
      {data.results.length === 0 && <h3>No result</h3>}

      <div className={classes["people-list"]}>
        {data.results.map((person) => {
          return <Person key={person.url as string} person={person} />;
        })}
      </div>
      <Pagination onPrevious={previousClickHandler} onNext={nextClickHandler} />
    </div>
  );
};

export default PeopleList;
