import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setError, setLoading } from "../redux/tvSlice";

const useFetchTMDB = (url, dataProcessor, action) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        console.log(response)
        const processedData = dataProcessor(response.data);
        dispatch(action(processedData));
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error.message);
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [url]);
};

export default useFetchTMDB;
