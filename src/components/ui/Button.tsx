import React from "react";
import classes from "./Button.module.css";

interface ButtonProps {
  name: string;
  onClick?: () => void;
}

class Button extends React.Component<ButtonProps> {
  render() {
    return (
      <button className={classes.btn} onClick={this.props.onClick}>
        {this.props.name}
      </button>
    );
  }
}

export default Button;
