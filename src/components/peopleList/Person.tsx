import React from "react";
import classes from "./Person.module.css";

interface PersonProps {
  person: Record<string, unknown>;
}

class Person extends React.Component<PersonProps> {
  render() {
    return (
      <div className={classes["person"]}>
        <h2>{this.props.person.name as string}</h2>
        <p>Eye Color: {this.props.person.eye_color as string}</p>
        <p>Height: {this.props.person.height as string}cm</p>
        <p>Mass: {this.props.person.mass as string}Kg</p>
        <p>Birth Year: {this.props.person.birth_year as string}</p>
      </div>
    );
  }
}

export default Person;
