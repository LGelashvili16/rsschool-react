import { Component } from "react";
import Search from "./components/Search";
import PeopleList from "./components/peopleList/PeopleList";
import { swapiPeopleURL } from "./constants/apiConfig";
import { EmptyProps } from "./constants/types";
import classes from "./App.module.css";
import Pagination from "./components/Pagination";
import Loader from "./components/ui/Loader";

export interface AppState {
  data: Record<string, unknown>;
  loading: boolean;
  error: string | null;
  searchTerm: string;
}

class App extends Component<EmptyProps, AppState> {
  state = {
    data: { results: [], previous: null, next: null },
    loading: true,
    error: null,
    searchTerm: "",
  };

  componentDidMount(): void {
    this.fetchPeople();
  }

  fetchPeople = async (endpoint: string = "", searchTerm: string = "") => {
    this.setState({ loading: true });

    let url = swapiPeopleURL;

    if (endpoint !== "" && searchTerm === "") url = endpoint;
    if (searchTerm !== "" && endpoint === "")
      url = `${swapiPeopleURL}?search=${searchTerm}`;

    try {
      const response = await fetch(`${url}`);

      if (!response.ok) {
        throw new Error(`An error occurred: ${response.status}`);
      }

      const data = await response.json();

      this.setState({ data: data, loading: false });
    } catch (error) {
      const errorMessage = (error as Error).message;
      this.setState({ error: errorMessage, loading: false });
    }
  };

  previousClickHandler = () => {
    if (this.state.data.previous) {
      this.fetchPeople(this.state.data.previous);
    }
  };
  nextClickHandler = () => {
    if (this.state.data.next) {
      this.fetchPeople(this.state.data.next);
    }
  };

  render() {
    return (
      <>
        <Search fetchPeople={this.fetchPeople} />
        {this.state.loading && <Loader />}
        {this.state.error && (
          <div className={classes["error-msg"]}>
            <h2>Error: {this.state.error}</h2>
          </div>
        )}
        {!this.state.loading && <PeopleList people={this.state.data.results} />}
        <Pagination
          onPrevious={this.previousClickHandler}
          onNext={this.nextClickHandler}
        />
      </>
    );
  }
}

export default App;
