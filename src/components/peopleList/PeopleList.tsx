import classes from "./PeopleList.module.css";
import Person from "./Person";
import Pagination from "../pagination/Pagination";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Flyout from "../flyout/Flyout";
import { ResultsInterface } from "../../interfaces/interfaces";

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
  const navigate = useNavigate();
  const params = useParams();
  const currentPage = useSelector(
    (state: RootState) => state.personList.currentPage,
  );
  const searchTerm = useSelector(
    (state: RootState) => state.personList.searchTerm,
  );

  const sectionClickHandler = () => {
    if (params.id) {
      navigate(`/home/?page=${currentPage}&search=${searchTerm}`);
    }
  };

  const sectionKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      params.id && navigate(`/home/?page=${currentPage}&search=${searchTerm}`);
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
