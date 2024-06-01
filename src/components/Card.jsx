import axios from "axios";
import DeleteButton from "../components/DeleteButton";
import { FaLocationDot } from "react-icons/fa6";
import { FaSuitcase } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { toast } from "react-toastify";
import { deleteJob } from "../redux/slices/jobSlice";
import { useDispatch } from "react-redux";

const Card = ({ job }) => {
  const dispatch = useDispatch();

  const color = {
    Interview: "green",
    Continues: "orange",
    Rejected: "red",
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3070/jobs/${job.id}`)
      .then(() => {
        toast.info("Silme islemi basarili");
        dispatch(deleteJob(job.id));
      })
      .catch(() => {
        toast.warn("basarisiz");
      });
  };

  return (
    <div className="card">
      <div className="card-head">
        <div className="head-left">
          <div className="letter">
            <span>{job.company[0]}</span>
          </div>
          <div className="info">
            <p>{job.position}</p>
            <p>{job.company}</p>
          </div>
        </div>
        <div className="head-right">
          <DeleteButton handleDelete={handleDelete} />
        </div>
      </div>
      <div className="card-body">
        <div className="field">
          <FaLocationDot />
          <p>{job.location}</p>
        </div>
        <div className="field">
          <FaSuitcase />
          <p>{job.type}</p>
        </div>
        <div className="field">
          <MdOutlineDateRange />
          <p>{job.date}</p>
        </div>
        <div className="status">
          <p style={{ backgroundColor: color[job.status] }}>{job.status}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
