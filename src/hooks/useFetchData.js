import { useEffect, useState } from "react";

const useFetchData = (handleFetchData, params) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [loginUserData, setLoaginUserData] = useState();
  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await handleFetchData(params);
        setData(fetchedData);
      } catch (error) {
        setError("Error while fetching data");
        console.log("Error : ", error);
      }
      setIsLoading(false);
    }
    fetchData();
  }, [handleFetchData, params]);

  return {
    isLoading,
    error,
    setError,
    data,
    setData,
    loginUserData,
    setLoaginUserData,
  };
};
export default useFetchData;
