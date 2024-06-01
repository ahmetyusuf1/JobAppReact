import { useDispatch, useSelector } from "react-redux";
import { setError, setJobs, setLoading } from "../redux/slices/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import Loader from "../components/Loader";
import Card from "../components/Card";
import FilteringForm from "../components/FilteringForm";

const JobList = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.jobSlice);

  const fetchData = () => {
    dispatch(setLoading());

    axios
      .get("http://localhost:3070/jobs")
      .then((response) => dispatch(setJobs(response.data)))
      .catch((error) => dispatch(setError(error.message)));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="job-list-page">
      <div className="filtering-form">
        <FilteringForm jobs={state.jobs} />
      </div>
      {state.isLoading ? (
        <Loader />
      ) : state.isError ? (
        <div className="error">
          <p>Sorry, an error occurred while accessing the data!</p>
          <span>{state.isError}</span>
          <button onClick={fetchData}>Try Again</button>
        </div>
      ) : (
        <div className="job-list">
          {state.jobs?.map((job, i) => (
            <Card key={i} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
