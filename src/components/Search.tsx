import React, { Component } from "react";

class Search extends Component {
  searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Hi");
  };

  render() {
    return (
      <section>
        <form onSubmit={this.searchHandler}>
          <input type="search" />
          <button>Search</button>
        </form>
      </section>
    );
  }
}

export default Search;
