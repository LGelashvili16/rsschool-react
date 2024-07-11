import { useCallback, useState } from "react";
import { swapiPeopleURL } from "../constants/apiConfig";

interface DataInterface {
  data: {
    results: Record<string, unknown>[];
    previous: string | null;
    next: string | null;
  };
  loading: boolean;
  error: string | null;
  fetchPeople: (endpoint?: string, searchTerm?: string) => void;
}

const useFetchData = (): DataInterface => {
  const [data, setData] = useState({
    results: [],
    previous: null,
    next: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPeople = useCallback(async (endpoint = "", searchTerm = "") => {
    setLoading(true);

    let url = swapiPeopleURL;

    if (endpoint !== "" && searchTerm === "") url = endpoint;
    if (searchTerm !== "" && endpoint === "")
      url = `${swapiPeopleURL}?search=${searchTerm}`;

    try {
      const response = await fetch(`${url}`);

      if (!response.ok) {
        throw new Error(`An error occurred: ${response.status}`);
      }

      const data = await response.json();

      setData(data);
      setLoading(false);
    } catch (error) {
      const errorMessage = (error as Error).message;
      setError(errorMessage);
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchPeople };
};

export default useFetchData;
