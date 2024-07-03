import React, { Component } from "react";
import classes from "./Search.module.css";

type SearchState = {
  searchTerm: string;
};
class Search extends Component<null, SearchState> {
  state = {
    searchTerm: "",
  };

  componentDidMount(): void {
    const searchedTerm = localStorage.getItem("searchTerm");

    if (searchedTerm !== null) {
      this.setState({
        searchTerm: JSON.parse(searchedTerm),
      });
    } else {
      this.setState({
        searchTerm: "",
      });
    }
  }

  searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const inputValue = formData.get("searchTerm");

    if (typeof inputValue === "string") {
      localStorage.setItem("searchTerm", JSON.stringify(inputValue.trim()));
      // this.setState({ searchTerm: inputValue });
    }
  };

  inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    return (
      <section className={classes["search-section"]}>
        <form className={classes["search-form"]} onSubmit={this.searchHandler}>
          <input
            type="search"
            name="searchTerm"
            placeholder="Type Search Term"
            value={this.state.searchTerm}
            onChange={this.inputChangeHandler}
          />
          <button>Search</button>
        </form>
        {this.state.searchTerm}
      </section>
    );
  }
}

export default Search;
