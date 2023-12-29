import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  updateConProjects,
  updateManagerProjects,
  updateTaskProjects,
} from "../../slices/projectReducer";
import "./dashboard.css";
import Project from "./sub/project";

export default function Dashboard() {
  const dispatch = useDispatch();
  const managerProjects = useSelector((state) => state.project.managerProjects);
  const taskProjects = useSelector((state) => state.project.taskProjects);
  const conProjects = useSelector((state) => state.project.conProjects);
  const [items, setItems] = useState(Array.from({ length: 20 }));
  const fetchMoreData = () => {
    try {
      fetch("http://localhost:8080/dashboard", {
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
          console.log("income", data);
          dispatch(updateManagerProjects(data.managerProjects.rows));
          dispatch(updateConProjects(data.conProjects.rows));
          dispatch(updateTaskProjects(data.taskProjects.rows));
        });
    } catch (err) {
      console.log(err);
    }
    setTimeout(() => {
      setItems(Array.from({ length: 20 }));
    }, 1000);
  };

  useEffect(fetchMoreData, [dispatch]);

  return (
    <>
      <div className="dashboard">
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={true}
          // loader={<h4 className="LoadingMessage">Loading...</h4>}
          height={"50rem"}
        >
          {managerProjects.map((project, index) => (
            <Link key={index} to={`/parts/${project.project_id}`}>
              <Project
                projectname={project.projectname}
                description={project.description}
                startdate={project.startdate}
                type="manager"
              />
            </Link>
          ))}
          {taskProjects.map((project, index) => (
            <Link key={index} to={`/parts/${project.project_id}`}>
              <Project
                key={index}
                projectname={project.projectname}
                description={project.description}
                startdate={project.startdate}
                type="task"
              />
            </Link>
          ))}
          {conProjects.map((project, index) => (
            <Link key={index} to={`/parts/${project.project_id}`}>
              <Project
                key={index}
                projectname={project.projectname}
                description={project.description}
                startdate={project.startdate}
                type="con"
              />
            </Link>
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
}
