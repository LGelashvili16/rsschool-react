import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import classes from "./Pagination.module.css";
import Button from "./ui/Button";
import { range } from "../utils/helper";

interface PaginationProps {
  count: number;
  fetchPeople: (endpoint?: string, term?: string, query?: string) => void;
}

const Pagination = ({ count, fetchPeople }: PaginationProps) => {
  const [activePage, setActivePage] = useState(1);
  const { pageQuery, updatePage } = useContext(GlobalContext);
  const amountOfPages = Math.ceil(count / 10);
  const pagesRange = range(1, amountOfPages);

  const sliceFrom = pageQuery > 1 ? pageQuery - 2 : pageQuery - 1;
  const sliceTo =
    pageQuery + 1 <= amountOfPages ? pageQuery + 1 : pageQuery + 1;

  const slicedPagesRange = pagesRange.slice(sliceFrom, sliceTo);

  const pageButtonHandler = (pageNumber: number) => {
    fetchPeople("", "", `?page=${pageNumber}`);
  };

  const previousClickHandler = () => {
    if (activePage > 1) {
      // fetchPeople(data.previous);
      fetchPeople("", "", `?page=${pageQuery - 1}`);
      updatePage(pageQuery - 1);
      setActivePage((prev) => prev - 1);
    }
  };

  const nextClickHandler = () => {
    if (activePage < amountOfPages) {
      // fetchPeople(data.previous);
      fetchPeople("", "", `?page=${pageQuery + 1}`);
      updatePage(pageQuery + 1);
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
              pageButtonHandler(pageNum);
              updatePage(pageNum);
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
