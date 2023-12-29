import { useEffect, useState } from "react";
import "./combobox.css"; // Import the CSS file for styling

import { useDispatch, useSelector } from "react-redux";

import {
  updateProjects,
  updateSelectedProject,
} from "../../../../../../slices/feedReducer";

const ComboBox = () => {
  const projects = useSelector((state) => state.feed.projects);
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    for (let i = 0; i < projects.length; i++) {
      if (event.target.value === projects[i].projectname) {
        dispatch(updateSelectedProject(projects[i].project_id));
        return;
      }
    }
  };
  const fetchProjects = () => {
    try {
      fetch("http://localhost:8080/auth/project", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Error getting post`);
          }
          return res.json();
        })
        .then((data) => {
          data.projects.rows.length > 0
            ? dispatch(updateSelectedProject(data.projects.rows[0].project_id))
            : dispatch(updateSelectedProject(-1));
          dispatch(updateProjects(data.projects.rows));
        });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchProjects();
  }, [dispatch]);

  return (
    <div className="combo-box-container">
      <div className="custom-select">
        <select
          className="combo"
          value={selectedValue}
          onChange={handleSelectChange}
        >
          {projects.map((project, index) => (
            <option value={project.projectname} key={index}>
              {project.projectname}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ComboBox;
