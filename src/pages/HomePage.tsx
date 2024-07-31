import { useEffect } from "react";
import PeopleList from "../components/peopleList/PeopleList";
import Search from "../components/Search";
import useLocalStorage from "../hooks/useLocalStorage";
import classes from "./HomePage.module.css";
import Loader from "../components/ui/Loader";
import { Outlet, useSearchParams } from "react-router-dom";
import { usePersonListQuery } from "../api/api";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const HomePage = () => {
  const [, setSearchParams] = useSearchParams();
  const [localStorageTerm] = useLocalStorage("searchedTerm");
  const currentPage = useSelector(
    (state: RootState) => state.personList.currentPage,
  );
  const searchTerm = useSelector(
    (state: RootState) => state.personList.searchTerm,
  );

  const {
    data: PersonListData,
    isLoading,
    isError,
    isUninitialized,
  } = usePersonListQuery({ page: currentPage, searchTerm: searchTerm });

  useEffect(() => {
    if (localStorageTerm === "" || localStorageTerm === null) {
      setSearchParams({ page: String(currentPage), search: searchTerm });
    }
  }, [localStorageTerm, currentPage, searchTerm]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading || isUninitialized) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className={classes["error-msg"]}>
        <h2>Oops! Something went wrong.</h2>
      </div>
    );
  }

  return (
    <>
      <Search />

      <section className={classes["search-results"]}>
        <PeopleList data={PersonListData} />
        <div className={classes["person-details"]}>
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default HomePage;
