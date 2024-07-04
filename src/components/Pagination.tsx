import React from "react";
import classes from "./Pagination.module.css";
import Button from "./ui/Button";

interface PaginationProps {
  onPrevious: () => void;
  onNext: () => void;
}

class Pagination extends React.Component<PaginationProps> {
  render(): React.ReactNode {
    return (
      <div className={classes.pagination}>
        <Button name="Previous" onClick={this.props.onPrevious} />
        <Button name="Next" onClick={this.props.onNext} />
      </div>
    );
  }
}

export default Pagination;
