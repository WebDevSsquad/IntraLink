

const TaskList = ({ tasks ,Project ,part,isreqclk ,stisreqclk }) => {

    // Convert the string to a Date object
    const dateObject1 = new Date(Project.startdate);

    // Get the date in the format "YYYY-MM-DD"
    const extractedDate1 = dateObject1.toISOString().substring(0, 10);
  
  
      // Convert the string to a Date object
      const dateObject2 = new Date(Project.duedate);
  
      // Get the date in the format "YYYY-MM-DD"
      const extractedDate2 = dateObject2.toISOString().substring(0, 10);

    return (
      <div className="task-list">
        <div className="firsttask">
        <div className="projectinfo">
        <h1 className="projectname">{ Project.projectname }</h1>
        <div className= {`status ${!Project.status ? "notfinishedproject" : "finishedproject"}`} ></div>
        </div>
        <h2 className="projectmanagerusername">{Project.username}</h2>
        <h2 className="projectmanageremail"> email: {Project.email} </h2>
        <h3 className="description">description:</h3>
        <h3 className="projectdescription">{Project.description}</h3>
        <h2 className="projectstartdate">startdate: {extractedDate1}</h2> 
        <h2 className="projectduedate"> duedate: {extractedDate2}</h2>
        </div>
        <div className="secondtask">
        {tasks.map(task => (
          <div className="task-preview" key={task.Task_id} >
            <div className="taskinfo">
            <h2>{task.taskname} </h2>
            <h2 className="taskprice">price:{task.price} </h2>
            </div>
            <div className="taskmanagerinfo">
            { task.username && <p>{task.username} is responsible for this task.</p> }
            { !task.username && <p>this task is free</p> }
            { task.username &&<p> email: {task.email} </p> }
            </div>
            { !task.username && <button className="buttontorequest" onClick={()=>{ if(!isreqclk) stisreqclk(true); else stisreqclk(false)}}>Request</button> }
            <div className="requirements">Req: {task.requirements.map((req,ind) => (<div key={ind}>{req}{ind !== task.requirements.length-1 ? ", ":""}</div>))}</div>
          </div>
        ))}
        </div>
        <div className="thirdtask">
        <h1 className="partname">{ part.partname }</h1>
        {part.username && <h2 className="taskmanagerusername">{part.username}</h2>}
        {!part.username && <h2 className="taskmanagerusername">this part free</h2>}
        {part.email && <h2 className="taskmanageremail"> email: {part.email} </h2>}
        </div>
      </div>
    );
  }
   
  export default TaskList;