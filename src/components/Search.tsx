import React, { useEffect, useState } from "react";
import classes from "./Search.module.css";
import Button from "./ui/Button";

interface SearchProps {
  fetchPeople: (endpoint: string, searchTerm: string) => void;
}

const Search = ({ fetchPeople }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [throwError, setThrowError] = useState(false);

  useEffect(() => {
    const searchedTerm = localStorage.getItem("searchTerm");

    if (searchedTerm !== null) {
      const searchTerm = JSON.parse(searchedTerm);

      setSearchTerm(searchTerm);

      fetchPeople("", searchTerm);
    } else {
      setSearchTerm("");
    }
  }, [fetchPeople]);

  const searchSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const inputValue = formData.get("searchTerm");

    if (typeof inputValue === "string") {
      localStorage.setItem("searchTerm", JSON.stringify(inputValue.trim()));
      fetchPeople("", inputValue.trim());
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const warningHandler = () => {
    setShowWarning(!showWarning);
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
        <div
          className={`${classes["warning-wrapper"]} ${showWarning ? "" : classes.dim}`}
        >
          {showWarning && (
            <p className={classes.warning}>
              <span>
                <b>WARNING:</b>
              </span>{" "}
              If you want to send a request to fetch all data, please click the
              'Search' button after deleting the search term.
            </p>
          )}
          <Button
            name={showWarning ? "Hide Warning" : "Show Warning"}
            onClick={warningHandler}
          />
        </div>

        <form className={classes["search-form"]} onSubmit={searchSubmitHandler}>
          <input
            type="search"
            name="searchTerm"
            placeholder="Type Search Term"
            value={searchTerm}
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
