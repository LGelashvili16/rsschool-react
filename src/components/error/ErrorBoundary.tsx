import React from "react";
import classes from "./ErrorBoundary.module.css";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: string;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state = {
    hasError: false,
    error: "",
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.log("static error", error);
    return { hasError: true, error: error.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log("error", error);
    console.log("error info", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={classes.error}>
          <h3>Something went wrong!</h3>
          <p>{this.state.error}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
