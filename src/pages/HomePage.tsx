import { useContext, useEffect } from "react";
import PeopleList from "../components/peopleList/PeopleList";
import Search from "../components/Search";
import useLocalStorage from "../hooks/useLocalStorage";
import useFetchData from "../hooks/useFetchData";
import classes from "./HomePage.module.css";
import Loader from "../components/ui/Loader";
import { Outlet, useSearchParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const HomePage = () => {
  const [, setSearchParams] = useSearchParams();
  const { data, loading, error, fetchPeople } = useFetchData();
  const [localStorageTerm] = useLocalStorage("searchedTerm");
  const { pageQuery, searchQuery } = useContext(GlobalContext);

  useEffect(() => {
    if (localStorageTerm === "" || localStorageTerm === null) {
      fetchPeople("", "", `?page=${pageQuery}`);
      setSearchParams({ page: String(pageQuery), search: searchQuery });
    }
    // Needs to be fixed
  }, [localStorageTerm, pageQuery, searchQuery, fetchPeople, setSearchParams]);

  return (
    <>
      <Search fetchData={fetchPeople} />

      {loading && <Loader />}

      {error && (
        <div className={classes["error-msg"]}>
          <h2>Error: {error}</h2>
        </div>
      )}

      <section className={classes["search-results"]}>
        <PeopleList data={data} fetchPeople={fetchPeople} />
        <div className={classes["person-details"]}>
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default HomePage;
