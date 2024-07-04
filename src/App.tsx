import { Component } from "react";
import Search from "./components/Search";
import BookList from "./components/BookList";
import { booksURL } from "./constants/apiConfig";
import { EmptyProps } from "./constants/types";

export interface AppState {
  books: Record<string, unknown>[];
  loading: boolean;
  error: string | null;
}
class App extends Component<EmptyProps, AppState> {
  state = {
    books: [],
    loading: true,
    error: null,
  };

  componentDidMount(): void {
    this.fetchBooks();
  }

  fetchBooks = async () => {
    try {
      const response = await fetch(
        `${booksURL}/?pageNumber=${0}&pageSize=${20}`,
      );

      if (!response.ok) {
        throw new Error(`An error occurred: ${response.status}`);
      }

      const data = await response.json();

      this.setState({ books: data.books, loading: false });
    } catch (error) {
      const errorMessage = (error as Error).message;
      this.setState({ error: errorMessage, loading: false });
    }
  };

  render() {
    console.log(this.state.books);
    return (
      <div>
        <Search />
        {this.state.loading && <p>Loading...</p>}
        {this.state.error && <p>Error: {this.state.error}</p>}
        <BookList books={this.state.books} />
      </div>
    );
  }
}

export default App;
