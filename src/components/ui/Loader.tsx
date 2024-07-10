import React from "react";
import classes from "./Loader.module.css";

class Loader extends React.Component {
  render(): React.ReactNode {
    return (
      <div className={classes.loading}>
        <div className={classes["loading-spinner"]}>
          <div></div>
          <div></div>
        </div>
        <div className={classes["loading-txt"]}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }
}

export default Loader;
