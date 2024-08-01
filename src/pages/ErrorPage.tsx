import { useRouteError } from "react-router-dom";
import Header from "../components/Header";
import classes from "./ErrorPage.module.css";

const ErrorPage = () => {
  const error = useRouteError();

  const isErrorWithMessage = (error: unknown): error is { message: string } => {
    return error !== null && typeof error === "object" && "message" in error;
  };

  return (
    <section>
      <Header />
      <div className={classes.error}>
        <p>
          {isErrorWithMessage(error) ? error.message : "Something went wrong."}
        </p>
      </div>
    </section>
  );
};

export default ErrorPage;
