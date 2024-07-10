import { useEffect, useState } from "react";
import { swapiPeopleURL } from "../constants/apiConfig";
import Search from "../components/Search";
import Loader from "../components/ui/Loader";
import PeopleList from "../components/peopleList/PeopleList";
import Pagination from "../components/Pagination";
import classes from "./HomePage.module.css";

export interface AppState {
  data: Record<string, unknown>;
  loading: boolean;
  error: string | null;
  searchTerm: string;
}

const HomePage = () => {
  const [data, setData] = useState({ results: [], previous: null, next: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async (
    endpoint: string = "",
    searchTerm: string = "",
  ) => {
    setLoading(true);

    let url = swapiPeopleURL;

    if (endpoint !== "" && searchTerm === "") url = endpoint;
    if (searchTerm !== "" && endpoint === "")
      url = `${swapiPeopleURL}?search=${searchTerm}`;

    try {
      const response = await fetch(`${url}`);

      if (!response.ok) {
        throw new Error(`An error occurred: ${response.status}`);
      }

      const data = await response.json();

      setData(data);
      setLoading(false);
    } catch (error) {
      const errorMessage = (error as Error).message;
      setError(errorMessage);
      setLoading(false);
    }
  };

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
    <>
      <Search fetchPeople={fetchPeople} />
      {loading && <Loader />}
      {error && (
        <div className={classes["error-msg"]}>
          <h2>Error: {error}</h2>
        </div>
      )}
      {!loading && <PeopleList people={data.results} />}
      <Pagination onPrevious={previousClickHandler} onNext={nextClickHandler} />
    </>
  );
};

export default HomePage;
