import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./feedback.css";
export default function Feedback() {
  const projectTabRef = useRef(null);
  const taskTabRef = useRef(null);
  const projectRef = useRef(null);
  const taskRef = useRef(null);
  const [comment, setComment] = useState("good");
  const [activeTab, setActiveTab] = useState(0);
  const [taskManagers, setTaskManagers] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [rate, setRate] = useState(10);
  //   const logged_id = useSelector((state) => state.user.userID);
  const logged_id = 19;
  useEffect(() => {
    const fetchTaskManagers = async () => {
      await fetch(`http://localhost:8080/feedback/getTaskManagers/${logged_id}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data.taskManagers);
          setTaskManagers(data.taskManagers);
          console.log(taskManagers);
        });
    };

    const fetchContributors = async () => {
      await fetch(`http://localhost:8080/feedback/getContributors/${logged_id}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data.contributors);
          setContributors(data.contributors);
          console.log(contributors);
        });
    };
    fetchTaskManagers();
    fetchContributors();
  }, [activeTab]);

  const handleClickRateTM = async (index) => {
    console.log(index);
    await fetch(`http://localhost:8080/feedback/giveFeedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        manager_id: logged_id,
        staffmember_id: taskManagers[index].taskmanager_id,
        project_id: taskManagers[index].project_id,
        rating: rate,
        comment_text: comment,
      }),
    }).then((res) => {
      console.log(res);
      console.log("msg is sent successfully.");
    });
  };
  const handleClickRateCon = async (index) => {
    console.log(index);
    console.log(
      logged_id,
      Number(contributors[index].contributor_id),
      Number(contributors[index].project_id),
      Number(rate),
      comment
    );
    await fetch(`http://localhost:8080/feedback/giveFeedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        manager_id: logged_id,
        staffmember_id: Number(contributors[index].contributor_id),
        project_id: Number(contributors[index].project_id),
        rating: Number(rate),
        comment_text: comment,
      }),
    }).then(() => {
      console.log("msg is sent successfully.");
    });
  };

  return (
    <div className="feedback-container">
      <div className="feedback-left-container">
        <div
          className="feedback-project-choice feedback-choice-active"
          ref={projectTabRef}
          onClick={() => {
            projectRef.current.style.display = "flex";
            taskRef.current.style.display = "none";
            projectTabRef.current.classList.add("feedback-choice-active");
            taskTabRef.current.classList.remove("feedback-choice-active");
            console.log("pro");
            setActiveTab(1);
          }}
        >
          Projects
        </div>
        <div
          className="feedback-task-choice"
          ref={taskTabRef}
          onClick={() => {
            projectRef.current.style.display = "none";
            taskRef.current.style.display = "flex";
            projectTabRef.current.classList.remove("feedback-choice-active");
            taskTabRef.current.classList.add("feedback-choice-active");
            console.log("task");
            setActiveTab(2);
          }}
        >
          Parts
        </div>
      </div>
      <div className="feedback-right-container">
        <div className="task-managers-div" ref={projectRef}>
          {taskManagers.map((tm, index) => {
            return (
              <div className="task-manager-card" key={index}>
                <img
                  src="https://w0.peakpx.com/wallpaper/10/338/HD-wallpaper-naruto-uzumaki-naruto-anime.jpg"
                  alt=""
                  className="task-manager-image"
                />
                <h2 className="task-manager-name">{`${tm.firstname} ${tm.lastname}`}</h2>
                <h2 className="task-manager-part-name">{tm.partname}</h2>
                <input
                  type="range"
                  min={0}
                  max={10}
                  className="task-manager-rate"
                  onChange={(e) => setRate(e.target.value)}
                />

                <button
                  className="give-rate"
                  onClick={() => handleClickRateTM(index)}
                >
                  Rate
                </button>
              </div>
            );
          })}
        </div>
        <div className="contributors-div" ref={taskRef}>
          {contributors.map((tm, index) => {
            return (
              <div className="task-manager-card" key={index}>
                <img
                  src="https://w0.peakpx.com/wallpaper/10/338/HD-wallpaper-naruto-uzumaki-naruto-anime.jpg"
                  alt=""
                  className="task-manager-image"
                />
                <h2 className="task-manager-name">{`${tm.firstname} ${tm.lastname}`}</h2>
                <h2 className="task-manager-part-name">{tm.taskname}</h2>
                <input
                  type="range"
                  min={0}
                  max={10}
                  className="task-manager-rate"
                  onChange={(e) => {
                    setRate(e.target.value);
                    console.log(rate);
                  }}
                />

                <button
                  className="give-rate"
                  onClick={() => handleClickRateCon(index)}
                >
                  Rate
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
