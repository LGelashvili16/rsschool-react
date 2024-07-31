import { useState } from "react";
import classes from "./Pagination.module.css";
import Button from "./ui/Button";
import { range } from "../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { personListActions } from "../store/PersonListSlice";

interface PaginationProps {
  count: number;
}

const Pagination = ({ count }: PaginationProps) => {
  const [activePage, setActivePage] = useState(1);

  const dispatch = useDispatch<AppDispatch>();

  const currentPage = useSelector(
    (state: RootState) => state.personList.currentPage,
  );

  const amountOfPages = Math.ceil(count / 10);
  const pagesRange = range(1, amountOfPages);

  const sliceFrom = currentPage > 1 ? currentPage - 2 : currentPage - 1;
  const sliceTo =
    currentPage + 1 <= amountOfPages ? currentPage + 1 : currentPage + 1;

  const slicedPagesRange = pagesRange.slice(sliceFrom, sliceTo);

  const previousClickHandler = () => {
    if (activePage > 1) {
      dispatch(personListActions.updateCurrentPage(currentPage - 1));
      setActivePage((prev) => prev - 1);
    }
  };

  const nextClickHandler = () => {
    if (activePage < amountOfPages) {
      dispatch(personListActions.updateCurrentPage(currentPage + 1));
      setActivePage((prev) => prev + 1);
    }
  };

  return (
    <div className={classes["pagination-wrapper"]}>
      <div className={classes.pagination}>
        <Button name="Previous" onClick={previousClickHandler} />
        {slicedPagesRange.map((pageNum) => (
          <button
            className={classes["pages-btn"]}
            key={pageNum}
            onClick={() => {
              dispatch(personListActions.updateCurrentPage(pageNum));
              setActivePage(pageNum);
            }}
            disabled={activePage === pageNum}
          >
            {pageNum}
          </button>
        ))}
        <Button name="Next" onClick={nextClickHandler} />
      </div>
    </div>
  );
};

export default Pagination;
