import React, { useEffect, useRef, useState } from "react";
import "./user-duties.css";
import { Link, Route, Routes, useParams } from "react-router-dom";
import UserTasks from "./UserTasks";
import UserProjects from "./UserProjects";
import UserParts from "./UserParts";

export default function UserDuties() {
  const projectRef = useRef(null);
  const partRef = useRef(null);
  const taskRef = useRef(null);
  const projectTabRef = useRef(null);
  const partTabRef = useRef(null);
  const taskTabRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [parts, setParts] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const { user_id } = useParams();
  console.log(user_id);

  useEffect(() => {
    const fetchProjects = async () => {
      await fetch(`http://localhost:8080/userDuties/getUserProjects/${user_id}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setProjects(data.projects);
          console.log(projects);
        });
    };
    const fetchTasks = async () => {
      await fetch(`http://localhost:8080/userDuties/getUserTasks/${user_id}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setTasks(data.tasks);
          console.log(tasks);
        });
    };

    const fetchParts = async () => {
      await fetch(`http://localhost:8080/userDuties/getUserParts/${user_id}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setParts(data.parts);
          console.log(parts);
        });
    };

    fetchProjects();
    fetchTasks();
    fetchParts();
  }, [activeTab]);

  return (
    <div className="userdutiescontainer">
      <div className="leftcontainer">
        <div
          className="projects-choice choice-active"
          ref={projectTabRef}
          onClick={() => {
            projectRef.current.style.display = "flex";
            partRef.current.style.display = "none";
            taskRef.current.style.display = "none";
            projectTabRef.current.classList.add("choice-active");
            partTabRef.current.classList.remove("choice-active");
            taskTabRef.current.classList.remove("choice-active");
            setActiveTab(1);
          }}
        >
          Projects
        </div>
        <div
          className="parts-choice"
          ref={partTabRef}
          onClick={() => {
            projectRef.current.style.display = "none";
            partRef.current.style.display = "flex";
            taskRef.current.style.display = "none";
            projectTabRef.current.classList.remove("choice-active");
            partTabRef.current.classList.add("choice-active");
            taskTabRef.current.classList.remove("choice-active");
            setActiveTab(2);
          }}
        >
          Parts
        </div>
        <div
          className="tasks-choice"
          ref={taskTabRef}
          onClick={() => {
            projectRef.current.style.display = "none";
            partRef.current.style.display = "none";
            taskRef.current.style.display = "flex";
            projectTabRef.current.classList.remove("choice-active");
            partTabRef.current.classList.remove("choice-active");
            taskTabRef.current.classList.add("choice-active");
            setActiveTab(3);
          }}
        >
          Tasks
        </div>
      </div>
      <div className="rightcontainer">
        <UserProjects pref={projectRef} projects={projects} />
        <UserParts paref={partRef} parts={parts} />
        <UserTasks uref={taskRef} tasks={tasks} />
      </div>
    </div>
  );
}
