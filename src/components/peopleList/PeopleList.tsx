import classes from "./PeopleList.module.css";
import Person from "./Person";
import Pagination from "../pagination/Pagination";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Flyout from "../flyout/Flyout";
import { ResultsInterface } from "../../interfaces/interfaces";
import { useRouter } from "next/router";

const PeopleList = ({
  data,
}: {
  data: {
    count: number;
    results: ResultsInterface[];
    previous: string | null;
    next: string | null;
  };
}) => {
  const router = useRouter();

  const currentPage = useSelector(
    (state: RootState) => state.personList.currentPage,
  );
  const searchTerm = useSelector(
    (state: RootState) => state.personList.searchTerm,
  );

  const sectionClickHandler = () => {
    if (router.query.personName) {
      router.push(
        `/home/?page=${currentPage}&search=${searchTerm}`,
        undefined,
        { shallow: true },
      );
    }
  };

  const sectionKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      router.query.personName &&
        router.push(
          `/home/?page=${currentPage}&search=${searchTerm}`,
          undefined,
          { shallow: true },
        );
    }
  };

  return (
    <div
      className={classes["people-list-wrapper"]}
      onClick={sectionClickHandler}
      onKeyDown={sectionKeyDownHandler}
      tabIndex={0}
      role="button"
    >
      <h2>Search Results</h2>
      {data.results.length === 0 && <h3>No result</h3>}

      <div className={classes["people-list"]}>
        {data.results.map((person) => {
          return <Person key={person.url as string} person={person} />;
        })}
      </div>
      {data.results.length > 0 && <Pagination count={data.count} />}

      <Flyout />
    </div>
  );
};

export default PeopleList;
