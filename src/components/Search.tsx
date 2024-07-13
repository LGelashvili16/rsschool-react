import React, { useEffect, useState } from "react";
import classes from "./Search.module.css";
import Button from "./ui/Button";
import useLocalStorage from "../hooks/useLocalStorage";
import { useSearchParams } from "react-router-dom";

interface SearchProps {
  fetchData: (endpoint?: string, term?: string) => void;
}

const Search = ({ fetchData }: SearchProps) => {
  const [, setSearchParams] = useSearchParams();
  const [InputValue, setInputValue] = useState("");
  const [throwError, setThrowError] = useState(false);
  const [localStorageTerm, setLocalStorageTerm] =
    useLocalStorage("searchedTerm");

  useEffect(() => {
    if (localStorageTerm) {
      setInputValue(localStorageTerm);
      fetchData("", localStorageTerm);
      setSearchParams({ page: String(1), search: localStorageTerm });
    }
  }, [localStorageTerm, fetchData]); // eslint-disable-line react-hooks/exhaustive-deps

  const searchSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const inputValue = formData.get("searchTerm") as string;

    fetchData("", inputValue);
    setSearchParams({ page: String(1), search: inputValue });
    setLocalStorageTerm(inputValue);
    setInputValue(inputValue);
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
