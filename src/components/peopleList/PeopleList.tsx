import React from "react";
import classes from "./PeopleList.module.css";
import Person from "./Person";

interface PeopleListProps {
  people: Record<string, unknown>[];
}

class PeopleList extends React.Component<PeopleListProps> {
  render() {
    return (
      <section className={classes["people-list-wrapper"]}>
        <h2>Search Results</h2>
        {this.props.people.length === 0 && <h3>No result</h3>}
        <div className={classes["people-list"]}>
          {this.props.people.map((person) => {
            return <Person key={person.url as string} person={person} />;
          })}
        </div>
      </section>
    );
  }
}

export default PeopleList;
