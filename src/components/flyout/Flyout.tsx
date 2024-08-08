import { useDispatch, useSelector } from "react-redux";
import classes from "./Flyout.module.css";
import { AppDispatch, RootState } from "../../store/store";
import Button from "../ui/Button";
import { personListActions } from "../../store/PersonListSlice";
import { convertToCSV, createBlobURL } from "../../utils/helper";
import { useRef } from "react";

const Flyout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedPersonsState = useSelector(
    (state: RootState) => state.personList.selectedPersons,
  );

  const selectedPersons = selectedPersonsState.filter(
    (person) => person.isSelected,
  );

  const downloadRef = useRef<HTMLAnchorElement | null>(null);

  const unselectAllHandler = () => {
    dispatch(personListActions.unselectAllPerson());
  };

  const downloadHandler = () => {
    const csv = convertToCSV(selectedPersons);
    const blobUrl = createBlobURL(csv);

    if (downloadRef.current !== null) {
      downloadRef.current.href = blobUrl;
      downloadRef.current.download = `${selectedPersons.length}_person.csv`;
      downloadRef.current.click();
    }
  };

  return (
    <div
      className={`${classes.flyout} ${selectedPersons.length > 0 ? classes["show"] : ""}`}
    >
      <h3>
        Selected Items{" "}
        <span
          className={
            selectedPersons.length > 0
              ? classes["green-sign"]
              : classes["red-sign"]
          }
        >
          ({selectedPersons.length})
        </span>
      </h3>
      <div className={classes["flyout-actions"]}>
        <Button name="Unselect All" onClick={unselectAllHandler} />
        <Button name="Download" onClick={downloadHandler} />
        <a ref={downloadRef} href="/" className={classes.hide}>
          Download
        </a>
      </div>
    </div>
  );
};

export default Flyout;
