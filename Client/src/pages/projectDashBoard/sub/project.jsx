import PropTypes from "prop-types";
import "./project.css";
import rankicon from "/assets/rankPM.svg";

export default function Project({ projectname, description, startdate, type }) {
  const dateObject = new Date(startdate);

  dateObject.setDate(dateObject.getDate() + 1);
  // Get the date in the format "YYYY-MM-DD"
  const extractedDate = dateObject.toISOString().substring(0, 10);

  return (
    <>
      <div className={`project-container ${type}`}>
        <div className="project-top">
          <div className="project-top-left">
            <div className="project_info">
              <span className="projectname">{projectname}</span>
              <span className="project-date">{extractedDate}</span>
            </div>
          </div>
          <div className="project-top-right">
            <div className="project_manager_rank">
              <img src={rankicon} className="project_rank_icon" />
              50
            </div>
          </div>
        </div>
        <div className="project-center">
          <div className="project-text">{description}</div>
        </div>
      </div>
    </>
  );
}
Project.propTypes = {
  projectname: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  startdate: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
