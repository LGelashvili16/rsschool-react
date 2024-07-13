import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import classes from "./PersonDetails.module.css";
import useFetchData from "../../hooks/useFetchData";
import { useContext, useEffect } from "react";
import Loader from "../ui/Loader";
import { GlobalContext } from "../../context/GlobalContext";

const PersonDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [, setSearchParams] = useSearchParams();
  const { data, loading, error, fetchPeople } = useFetchData();
  const { pageQuery, searchQuery } = useContext(GlobalContext);

  useEffect(() => {
    if (params.id) {
      setSearchParams({ page: String(pageQuery), details: params.id });
    }
  }, [pageQuery, params.id, setSearchParams]);

  useEffect(() => {
    if (params.id) {
      fetchPeople("", params.id);
    }
  }, [params.id, fetchPeople]);

  const closeTabHandler = () => {
    navigate(`/home/?page=${pageQuery}&search=${searchQuery}`);
  };

  let content;

  if (data.results.length > 0) {
    const person = data.results[0];

    content = (
      <div className={classes["person-details-tab"]}>
        {loading && <Loader />}
        {error && (
          <div className={classes["error-msg"]}>
            <h2>Error: {error}</h2>
          </div>
        )}

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
      {loading ? <Loader /> : content}
    </div>
  );
};

export default PersonDetails;
