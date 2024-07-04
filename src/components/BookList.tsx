import React from "react";

interface BookListProps {
  books: Record<string, unknown>[];
}

class BookList extends React.Component<BookListProps> {
  render() {
    return (
      <section>
        {this.props.books.map((book) => {
          return <p key={book.uid as string}>{book.title as string}</p>;
        })}
      </section>
    );
  }
}

export default BookList;
