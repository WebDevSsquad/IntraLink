import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import TaskList from "./tasklist";
import "./Task.css";
import { useParams } from "react-router-dom";

const Task = () => {
    const { project_id , part_id } = useParams();

    const [project ,setproject] = useState(
    {Project_id: 1 , Projectname: 'projectname' , description: "this software project and so good project" ,
    startdate: "5/11/2005" , duedate: "5/11/2006" , status: "notfinished" , Username: "mohamedamr" ,
    email: "mina309hany@gmail.com"}
    );

    const [part ,setPart] = useState(
    { Part_id: 1, Project_id: 1, Partname: 'p1', Username: "mohamedamr" ,email: "mohamed@gmail.com"  }
    );

  const Tasks = [
    { Task_id: 1, Part_id: 1, Project_id: 1, Taskname: 'T1', Username: "mohamedamr" ,email: "mohamed@gmail.com"  },
    { Task_id: 2, Part_id: 1, Project_id: 1, Taskname: 'T2', Username: ""   ,email:  "mohamed@gmail.com"  },
    { Task_id: 3, Part_id: 1, Project_id: 1, Taskname: 'T3', Username: "marwan"   ,email:  "mohamed@gmail.com"  },
    { Task_id: 4, Part_id: 1, Project_id: 1, Taskname: 'T4', Username: "mmm"   ,email:  "mohamed@gmail.com"  },
    { Task_id: 5, Part_id: 1, Project_id: 1, Taskname: 'T5', Username: "mohamedamr" ,email: "mohamed@gmail.com"  }
  ];

 const [nTasks ,setnTasks] = useState(Tasks);

  const filter = (Tasknametofind) => {
    const newTasks = Tasks.filter(Task => Task.Taskname.toLowerCase().includes(Tasknametofind.toLowerCase()));
    setnTasks(newTasks);
  }


  return (
    <div className="tasks_main">
        <div className="search-container">
      <input onChange={(e) => filter(e.target.value) } type="text" placeholder="Search...." className="search-bar-tasks"/>
        <FontAwesomeIcon className="search-icon" icon={faSearch} />
        </div>
      <TaskList tasks={nTasks} Project={project} part={part} />
    </div>
  );
}
 
export default Task;