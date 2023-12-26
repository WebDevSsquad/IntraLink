

const TaskList = ({ tasks ,Project ,part }) => {
    return (
      <div className="task-list">
        <div className="firsttask">
        <h1 className="projectname">{ Project.Projectname }</h1>
        <h2 className="projectmanagerusername">{Project.Username}</h2>
        <h2 className="projectmanageremail"> email: {Project.email} </h2>
        <h3 className="description">description:</h3>
        <h3 className="projectdescription">{Project.description}</h3>
        <h2 className="projectstartdate">startdate: {Project.startdate}</h2> 
        <h2 className="projectduedate"> duedate: {Project.duedate}</h2>
        </div>
        <div className="secondtask">
        {tasks.map(task => (
          <div className="task-preview" key={task.Task_id} >
            <div className="taskinfo">
            <h2>{ task.Taskname }</h2>
            </div>
            <div className="taskmanagerinfo">
            { task.Username && <p>{task.Username} is responsible for this task.</p> }
            { !task.Username && <p>this task is free</p> }
            { task.Username &&<p> email: {task.email}. </p> }
            </div>
            { !task.Username && <button className="buttontorequest">Request</button> }
          </div>
        ))}
        </div>
        <div className="thirdtask">
        <h1 className="partname">{ part.Partname }</h1>
        <h2 className="taskmanagerusername">{part.Username}</h2>
        <h2 className="taskmanageremail"> email: {part.email} </h2>
        </div>
      </div>
    );
  }
   
  export default TaskList;