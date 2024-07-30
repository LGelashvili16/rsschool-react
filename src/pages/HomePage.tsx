import { useContext, useEffect } from "react";
import PeopleList from "../components/peopleList/PeopleList";
import Search from "../components/Search";
import useLocalStorage from "../hooks/useLocalStorage";
import useFetchData from "../hooks/useFetchData";
import classes from "./HomePage.module.css";
import Loader from "../components/ui/Loader";
import { Outlet, useSearchParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import { usePersonListQuery } from "../features/api";

const HomePage = () => {
  const [, setSearchParams] = useSearchParams();
  const { data, loading, error, fetchPeople } = useFetchData();
  const [localStorageTerm] = useLocalStorage("searchedTerm");
  const { pageQuery, searchQuery } = useContext(GlobalContext);
  const { data: testData } = usePersonListQuery();

  console.log("TEST!!!", testData);

  useEffect(() => {
    if (localStorageTerm === "" || localStorageTerm === null) {
      fetchPeople("", "", `?page=${pageQuery}`);
      setSearchParams({ page: String(pageQuery), search: searchQuery });
    }
  }, [localStorageTerm, pageQuery, searchQuery, fetchPeople]); // eslint-disable-line react-hooks/exhaustive-deps
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
