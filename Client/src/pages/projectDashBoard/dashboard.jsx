import { useEffect, useRef, useState } from "react";
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
import rankicon from "/assets/rankPM.svg";

export default function Dashboard() {
  const dispatch = useDispatch();
  const managerProjects = useSelector((state) => state.project.managerProjects);
  const taskProjects = useSelector((state) => state.project.taskProjects);
  const conProjects = useSelector((state) => state.project.conProjects);
  const [items, setItems] = useState(Array.from({ length: 20 }));
  const [toggled, setToggled] = useState(true);
  const userName = useSelector((state) => state.user.userName);
  const userPhoto = useSelector((state) => state.user.picture);
  const managerRank = useSelector((state) => state.user.managerRank);
  const addProjectRef = useRef(null);
  const name = useRef(null);
  const description = useRef(null);
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
          // console.log("income", data);
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

  const handelAddOffer = () => {
    const add = {
      projectname: name.current.value,
      description: description.current.value,
    };
    try {
      fetch("http://localhost:8080/dashboard/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(add),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Error getting post`);
          }
          return res.json();
        })
        .then((data) => {
          dispatch(updateManagerProjects(data.managerProjects.rows));
        });
    } catch (err) {
      console.log(err);
    }
  };
  const handelOpenAddOffer = () => {
    if (addProjectRef.current) {
      addProjectRef.current.style.transform = `scale(${toggled & 1})`;
      setToggled(!toggled);
    }
  };
  const ProjectName = (
    <div className="move-input-box">
      <div className="input-box ">
        <input
          ref={name}
          type="text"
          className="input-control"
          name="projectName"
          id="text"
          required
        />
        <label htmlFor="projectName" className="label-control">
          Project Name
        </label>
      </div>
    </div>
  );
  const addProjects = (
    <div
      style={{
        marginBottom: "0rem",
        height: `25rem`,
        justifyContent: "space-between",
      }}
      ref={addProjectRef}
      className="add-post-container"
    >
      <div className="post-top">
        <div className="post-top-left">
          <div className="post-profile-img_container">
            <img className="post-profile-img" src={userPhoto} alt="" />
          </div>
          <div className="post_user_info">
            <span className="post-username">{userName}</span>
          </div>
        </div>

        <div className="post-top-right">
          <div className="post_project_manager_rank">
            <img src={rankicon} className="post_rank_icon" />
            {managerRank}
          </div>
        </div>
      </div>

      {ProjectName}

      <div
        className="projectdescription-container"
        style={{ marginBottom: "-8rem", marginLeft: "2rem" }}
      >
        <div className="projectdescription">Description</div>
        <textarea
          className="projectdescription-input"
          ref={description}
        ></textarea>
      </div>

      <div onClick={handelAddOffer} className="add_post-bottom-right">
        <div className="add_button" onClick={handelOpenAddOffer}>
          Add
        </div>
      </div>
    </div>
  );

  useEffect(fetchMoreData, [dispatch]);
  const addProjectButton = (
    <div onClick={handelOpenAddOffer} className={`addPostButton`}>
      <img src={`/assets/plus.svg`} className="add_post_icon" />
    </div>
  );
  return (
    <>
      <div className="dashboard">
        {addProjectButton}
        {addProjects}
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
