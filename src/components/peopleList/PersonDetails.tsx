import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import classes from "./PersonDetails.module.css";
import { useEffect } from "react";
import Loader from "../ui/Loader";
import { usePersonQuery } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { personSliceActions } from "../../store/PersonSlice";

const PersonDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [, setSearchParams] = useSearchParams();

  const dispatch = useDispatch<AppDispatch>();
  const searchedPerson = useSelector(
    (state: RootState) => state.person.searchedPerson,
  );
  const currentPage = useSelector(
    (state: RootState) => state.personList.currentPage,
  );
  const searchTerm = useSelector(
    (state: RootState) => state.personList.searchTerm,
  );

  const { data, isFetching, isError, isUninitialized } = usePersonQuery({
    name: searchedPerson,
  });

  useEffect(() => {
    if (params.id) {
      setSearchParams({ details: params.id });
    }
  }, [params.id, setSearchParams]);

  useEffect(() => {
    if (data) {
      dispatch(personSliceActions.updatePersonDetails(data.results));
    }
  }, [data, dispatch]);

  const closeTabHandler = () => {
    navigate(`/home/?page=${currentPage}&search=${searchTerm}`);
  };

  if (isFetching || isUninitialized) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className={classes["error-msg"]}>
        <h2>Error:</h2>
      </div>
    );
  }

  let content;

  if (data && data.results.length > 0) {
    const person = data.results[0];

    content = (
      <div className={classes["person-details-tab"]}>
        <div className={classes["person-details-title"]}>
          <h2>Person Details</h2>
          <button onClick={closeTabHandler}>Close Tab</button>
        </div>

        <div className={classes["person-details-info"]}>
          <h3>Name: {person.name}</h3>
          <ul>
            <li>Birth Year: {person["birth_year"]}</li>
            <li>Eye Color: {person["eye_color"]}</li>
            <li>Gender: {person["gender"]}</li>
            <li>Hair Color: {person["hair_color"]}</li>
            <li>Height: {person["height"]}</li>
            <li>Weight: {person["mass"]}</li>
            <li>Skin Color: {person["skin_color"]}</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className={classes["person-details-wrapper"]}>
      {isFetching ? <Loader /> : content}
    </div>
  );
};

export default PersonDetails;
