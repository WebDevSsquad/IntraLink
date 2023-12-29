import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function UserProjects({ pref, projects }) {
  console.log(projects.length);
  return (
    <div
      ref={pref}
      className={
        projects.length !== 0 ? "projects-div" : "projects-div no-projects-div"
      }
    >
      {projects.length !== 0 ? (
        projects.map((p) => {
          return (
            <Link
              className="project-card"
              to={`/parts/${p.project_id}`}
              key={p.project_id}
            >
              <div className="project-card-info">
                <h2 className="project-card-info-name">{p.projectname}</h2>
                <div
                  className={`project-card-info-status ${
                    p.status ? "status-finished" : "status-running"
                  }`}
                ></div>
              </div>
              <div className="project-card-start-date">
                {`Start Date : ${new Date(p.startdate)
                  .toISOString()
                  .substring(0, 10)}`}
              </div>
              <div className="project-card-due-date">{`Due Date : ${new Date(
                p.duedate
              )
                .toISOString()
                .substring(0, 10)}`}</div>
            </Link>
          );
        })
      ) : (
        <div className="empty-projects">
          <FontAwesomeIcon icon={faTrash} />
          <p>You don't have any project</p>
        </div>
      )}
    </div>
  );
}
