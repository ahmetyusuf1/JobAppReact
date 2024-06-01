import { useEffect, useState } from "react";
import { sortOptions, statusOptions, typeOptions } from "../constants";
import { useDispatch } from "react-redux";
import {
  clearFilters,
  filterBySearch,
  sortJobs,
} from "../redux/slices/jobSlice";

const FilteringForm = ({ jobs }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(filterBySearch({ field: "company", text }));
    }, 500);

    return () => clearTimeout(timer);
  }, [text]);
  return (
    <section className="filter-section">
      <h2>Filtering Form</h2>
      <form>
        <div>
          <label>Search for company name:</label>
          <input onChange={(e) => setText(e.target.value)} type="text" />
        </div>
        <div>
          <label>Status</label>
          <select
            onChange={(e) =>
              dispatch(
                filterBySearch({ field: "status", text: e.target.value })
              )
            }
            name="status"
          >
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
          <select
            onChange={(e) =>
              dispatch(filterBySearch({ field: "type", text: e.target.value }))
            }
            name="type"
          >
            <option value="" hidden>
              ...
            </option>
            {typeOptions.map((choice, i) => (
              <option key={i}>{choice}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Sort</label>
          <select
            onChange={(e) => dispatch(sortJobs(e.target.value))}
            name="type"
          >
            {sortOptions.map((choice, i) => (
              <option key={i}>{choice}</option>
            ))}
          </select>
        </div>
        <div>
          <button
            onClick={() => dispatch(clearFilters())}
            role="button"
            type="reset"
            className="button-name"
          >
            Reset
          </button>
        </div>
      </form>
    </section>
  );
};

export default FilteringForm;
