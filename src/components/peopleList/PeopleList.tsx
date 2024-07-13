import classes from "./PeopleList.module.css";
import Person from "./Person";
import Pagination from "../Pagination";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { useContext } from "react";

const PeopleList = ({
  data,
  fetchPeople,
}: {
  data: {
    count: number;
    results: Record<string, unknown>[];
    previous: string | null;
    next: string | null;
  };
  fetchPeople: (endpoint?: string, term?: string, query?: string) => void;
}) => {
  const navigate = useNavigate();
  const params = useParams();
  const { pageQuery, searchQuery, updatePage } = useContext(GlobalContext);

  const previousClickHandler = () => {
    if (data.previous) {
      // fetchPeople(data.previous);
      fetchPeople("", "", `?page=${pageQuery - 1}`);
      updatePage(pageQuery - 1);
    }
  };

  const nextClickHandler = () => {
    if (data.next) {
      // fetchPeople(data.next);
      fetchPeople("", "", `?page=${pageQuery + 1}`);
      updatePage(pageQuery + 1);
    }
  };

  const sectionClickHandler = () => {
    if (params.id) {
      navigate(`/home/?page=${pageQuery}&search=${searchQuery}`);
    }
  };

  const sectionKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      params.id && navigate(`/home/?page=${pageQuery}&search=${searchQuery}`);
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
      {data.results.length > 0 && (
        <Pagination
          count={data.count}
          onPrevious={previousClickHandler}
          onNext={nextClickHandler}
          fetchPeople={fetchPeople}
        />
      )}
    </div>
  );
};

export default PeopleList;
