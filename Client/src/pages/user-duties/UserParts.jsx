import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./user-duties.css";
import { Link } from "react-router-dom";

export default function UserParts({ paref, parts }) {
  return (
    <div
      className={parts.length !== 0 ? "parts-div" : "parts-div no-parts-div"}
      ref={paref}
    >
      {parts.length !== 0 ? (
        parts.map((p) => {
          return (
            <Link
              className="part-card"
              to={`/Tasks/${p.project_id}/${p.part_id}`}
              key={p.part_id}
            >
              <h2 className="part-card-name">{p.partname}</h2>
            </Link>
          );
        })
      ) : (
        <div className="empty-parts">
          <FontAwesomeIcon icon={faTrash} />
          <p>You don't have any tasks</p>
        </div>
      )}
    </div>
  );
}
