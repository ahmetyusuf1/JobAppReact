import { v4 as uuidv4 } from "uuid";
import { statusOptions, typeOptions } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  createJob,
  setError,
  setJobs,
  setLoading,
} from "../redux/slices/jobSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AddJob = () => {
  const state = useSelector((store) => store.jobSlice);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setLoading());

    axios
      .get("http://localhost:3070/jobs")
      .then((response) => dispatch(setJobs(response.data)))
      .catch((error) => dispatch(setError(error.message)));
  }, []);

  console.log(state.jobs);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newJob = Object.fromEntries(formData.entries());

    newJob.id = uuidv4();
    newJob.date = new Date().toLocaleDateString();

    axios
      .post("http://localhost:3070/jobs", newJob)
      .then(() => {
        toast.success("New job has been added");
        dispatch(createJob(newJob));
        navigate("/");
      })
      .catch(() => toast.warn("Something went wrong"));
  };

  const removeDuplicates = (key) => {
    const array = state.jobs.map((job) => job[key]);

    const filtered = array.filter(
      (value, index) => array.indexOf(value) === index
    );

    return filtered;
  };

  return (
    <div className="add-page">
      <section className="add-section">
        <h2>Add New Job</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Position</label>
            <input list="positions" type="text" name="position" required />
            <datalist id="positions">
              {removeDuplicates("position").map((position, i) => (
                <option key={i} value={position} />
              ))}
            </datalist>
          </div>
          <div>
            <label>Company</label>
            <input list="companies" type="text" name="company" required />
            <datalist id="companies">
              {removeDuplicates("company").map((company, i) => (
                <option key={i} value={company} />
              ))}
            </datalist>
          </div>
          <div>
            <label>Location</label>
            <input type="text" name="location" required />
          </div>
          <div>
            <label>Status</label>
            <select name="status" required>
              <option value="" hidden>
                ...
              </option>
              {statusOptions.map((choice, i) => (
                <option key={i}>{choice}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Type</label>
            <select name="type" required>
              <option value="" hidden>
                ...
              </option>
              {typeOptions.map((choice, i) => (
                <option key={i}>{choice}</option>
              ))}
            </select>
          </div>
          <div>
            <button role="button" type="submit" className="button-name">
              Add
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
