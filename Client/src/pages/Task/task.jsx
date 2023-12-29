import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import TaskList from "./tasklist";
import "./Task.css";
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import HomeBar from '../home/sub/home_bar/home_bar';
const Task = () => {

  const { project_id , part_id } = useParams();

  const [project ,setproject] = useState(null);

  const [part ,setPart] = useState(null);

  const [Tasks , setTasks] = useState(null);

 const [nTasks ,setnTasks] = useState(null);

 const [isdatageted, setisdatageted] = useState(false);

 const [isdatapmgeted, setisdatapmgeted] = useState(false);

 const [isdatapartgeted, setisdatapartgeted] = useState(false);

 const [ isreqclicked , setisreqclicked] = useState(false);


 useEffect(() => {
  const fetchData1 = async () =>{
  fetch(`http://localhost:8080/tasksinfo/tmid/${project_id}/${part_id}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setTasks(data.ans);
      setnTasks(data.ans);
      setisdatageted(true);
    })};


    const fetchData2 = async () =>{
      fetch(`http://localhost:8080/partsinfo/pminfo/${project_id}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setproject(...data.ans);
          setisdatapmgeted(true);
        })};


      const fetchData3 = async () =>{
        fetch(`http://localhost:8080/tasksinfo/pmid/${project_id}/${part_id}`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setPart(...data.ans);
            setisdatapartgeted(true);
          })};


    fetchData1();
    fetchData2();
    fetchData3();
},[isreqclicked]);


  const filter = (Tasknametofind) => {
    const newTasks = Tasks.filter(Task => Task.taskname.toLowerCase().includes(Tasknametofind.toLowerCase()));
    setnTasks(newTasks);
  }


  return (
    <div className="tasks_main">
          <HomeBar />
        <div className="search-container">
      <input onChange={(e) => {isdatapartgeted && isdatapmgeted && isdatageted && filter(e.target.value)} } type="text" placeholder="Search...." className="search-bar-tasks"/>
        <FontAwesomeIcon className="search-icon" icon={faSearch} />
        </div>
      { isdatapartgeted && isdatapmgeted && isdatageted && <TaskList tasks={nTasks} Project={project} part={part} reqclk={isreqclicked} setreqclk={setisreqclicked} />}
    </div>
  );
}
 
export default Task;