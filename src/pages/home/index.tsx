import { useEffect } from "react";
import PeopleList from "../../components/peopleList/PeopleList";
import Search from "../../components/search/Search";
import useLocalStorage from "../../hooks/useLocalStorage";
import classes from "./HomePage.module.css";
import Loader from "../../components/ui/Loader";
import { usePersonListQuery } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { personListActions } from "../../store/PersonListSlice";
import { useRouter } from "next/router";
import PersonDetails from "./[personName]";

const HomePage = () => {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const currentPage = useSelector(
    (state: RootState) => state.personList.currentPage,
  );
  const searchTerm = useSelector(
    (state: RootState) => state.personList.searchTerm,
  );

  const [localStorageTerm] = useLocalStorage("searchedTerm");

  const {
    data: PersonListData,
    isLoading,
    isFetching,
    isError,
    isUninitialized,
  } = usePersonListQuery({ page: currentPage, searchTerm: searchTerm });

  useEffect(() => {
    if (localStorageTerm === "" || localStorageTerm === null) {
      const params = new URLSearchParams({
        page: String(currentPage),
        search: searchTerm,
      });
      router.push(`/home?${params.toString()}`, undefined, { shallow: true });
    }
  }, [localStorageTerm, currentPage, searchTerm]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (PersonListData) {
      dispatch(personListActions.updatePersonList(PersonListData.results));
    }
  }, [dispatch, PersonListData]);

  if (isLoading || isFetching || isUninitialized) {
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
          {router.query.personName && <PersonDetails />}
        </div>
      </section>
    </>
  );
};

export default HomePage;
