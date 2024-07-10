import classes from "./Pagination.module.css";
import Button from "./ui/Button";

interface PaginationProps {
  onPrevious: () => void;
  onNext: () => void;
}

const Pagination = ({ onPrevious, onNext }: PaginationProps) => {
  return (
    <div className={classes.pagination}>
      <Button name="Previous" onClick={onPrevious} />
      <Button name="Next" onClick={onNext} />
    </div>
  );
};

export default Pagination;
