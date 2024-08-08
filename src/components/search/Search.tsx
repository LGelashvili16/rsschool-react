import React, { useEffect, useState } from "react";
import classes from "./Search.module.css";
import Button from "../ui/Button";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { personListActions } from "../../store/PersonListSlice";
import { useRouter } from "next/router";

const Search = () => {
  const router = useRouter();
  const [InputValue, setInputValue] = useState("");
  const [throwError, setThrowError] = useState(false);
  const [localStorageTerm, setLocalStorageTerm] =
    useLocalStorage("searchedTerm");

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (localStorageTerm) {
      setInputValue(localStorageTerm);
      dispatch(personListActions.updateSearchTerm(localStorageTerm));
      const params = new URLSearchParams({
        page: String(1),
        search: localStorageTerm,
      });

      router.push(`home?${params}`, undefined, { shallow: true });
    }
  }, [localStorageTerm]); // eslint-disable-line react-hooks/exhaustive-deps

  const searchSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const inputValue = formData.get("searchTerm") as string;

    dispatch(personListActions.updateCurrentPage(1));
    dispatch(personListActions.updateSearchTerm(inputValue));
    setLocalStorageTerm(inputValue);
    setInputValue(inputValue);

    const params = new URLSearchParams({
      page: String(1),
      search: inputValue,
    });

    router.push(`home?${params}`, undefined, { shallow: true });
    console.log(inputValue);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const throwErrorHandler = () => {
    setThrowError(true);
  };

  if (throwError) {
    throw new Error("Custom Error! This error was caused intentionally.");
  }

  return (
    <>
      <section className={classes["search-section"]}>
        <form className={classes["search-form"]} onSubmit={searchSubmitHandler}>
          <input
            type="search"
            name="searchTerm"
            placeholder="Type Search Term"
            data-testid="search-input"
            value={InputValue}
            onChange={inputChangeHandler}
          />
          <Button name="Search" />
        </form>

        <div className={classes["throw-error"]}>
          <Button name="Throw Error" onClick={throwErrorHandler} />
        </div>
      </section>
    </>
  );
};

export default Search;
