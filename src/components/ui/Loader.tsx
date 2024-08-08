import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={classes.loading}>
      <div className={classes["loading-wrapper"]}>
        <div className={classes["loading-spinner"]}>
          <div></div>
          <div></div>
        </div>
        <div className={classes["loading-txt"]}>
          <p>Loading</p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
