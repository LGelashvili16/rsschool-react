import React, { Component } from "react";
import classes from "./Search.module.css";
import Button from "./ui/Button";

interface SearchState {
  searchTerm: string;
  showWarning: boolean;
  throwError: boolean;
}

interface SearchProps {
  fetchPeople: (endpoint: string, searchTerm: string) => void;
}

class Search extends Component<SearchProps, SearchState> {
  state = {
    searchTerm: "",
    showWarning: false,
    throwError: false,
  };

  componentDidMount(): void {
    const searchedTerm = localStorage.getItem("searchTerm");

    if (searchedTerm !== null) {
      const searchTerm = JSON.parse(searchedTerm);

      this.setState({
        searchTerm: searchTerm,
      });

      this.props.fetchPeople("", searchTerm);
    } else {
      this.setState({
        searchTerm: "",
      });
    }
  }

  searchSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const inputValue = formData.get("searchTerm");

    if (typeof inputValue === "string") {
      localStorage.setItem("searchTerm", JSON.stringify(inputValue.trim()));
      this.props.fetchPeople("", inputValue.trim());
    }
  };

  inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  warningHandler = () => {
    this.setState({ showWarning: !this.state.showWarning });
  };

  throwErrorHandler = () => {
    this.setState({ throwError: true });
  };

  render() {
    if (this.state.throwError) {
      throw new Error("Custom Error! This error was caused intentionally.");
    }

    return (
      <>
        <section className={classes["search-section"]}>
          <div
            className={`${classes["warning-wrapper"]} ${this.state.showWarning ? "" : classes.dim}`}
          >
            {this.state.showWarning && (
              <p className={classes.warning}>
                <span>
                  <b>WARNING:</b>
                </span>{" "}
                If you want to send a request to fetch all data, please click
                the 'Search' button after deleting the search term.
              </p>
            )}
            <Button
              name={this.state.showWarning ? "Hide Warning" : "Show Warning"}
              onClick={this.warningHandler}
            />
          </div>

          <form
            className={classes["search-form"]}
            onSubmit={this.searchSubmitHandler}
          >
            <input
              type="search"
              name="searchTerm"
              placeholder="Type Search Term"
              value={this.state.searchTerm}
              onChange={this.inputChangeHandler}
            />
            <Button name="Search" />
          </form>

          <div className={classes["throw-error"]}>
            <Button name="Throw Error" onClick={this.throwErrorHandler} />
          </div>
        </section>
      </>
    );
  }
}

export default Search;
