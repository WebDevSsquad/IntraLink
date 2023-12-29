import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./user-duties.css";
export default function UserTasks({ uref, tasks }) {
  return (
    <div
      className={tasks.length !== 0 ? "tasks-div" : "tasks-div no-tasks-div"}
      ref={uref}
    >
      {tasks.length !== 0 ? (
        tasks.map((t) => {
          return (
            <>
              <div className="task-card">
                <h2 className="task-card-name">{t.taskname}</h2>
                <div className="task-card-req-container">
                  {t.requirements.map((r) => {
                    return <div className="task-card-req">{r}</div>;
                  })}
                </div>
                <div className="task-card-price">{t.price + "$"}</div>
              </div>
            </>
          );
        })
      ) : (
        <div className="empty-tasks">
          <FontAwesomeIcon icon={faTrash} />
          <p>You don't have any tasks</p>
        </div>
      )}
    </div>
  );
}
