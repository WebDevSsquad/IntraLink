import { Link } from 'react-router-dom';
import { useRef } from 'react';

const PartList = ({ Parts ,Project ,isreqclk ,stisreqclk }) => {
  
  // Convert the string to a Date object
  const dateObject1 = new Date(Project.startdate);

  // Get the date in the format "YYYY-MM-DD"
  const extractedDate1 = dateObject1.toISOString().substring(0, 10);


    // Convert the string to a Date object
    const dateObject2 = new Date(Project.duedate);

    // Get the date in the format "YYYY-MM-DD"
    const extractedDate2 = dateObject2.toISOString().substring(0, 10);


    return (
      <div className="Part-list">
        <div className="firstpart">
          <div className="projectinfo">
        <h1 className="projectname">{ Project.projectname } </h1>
        <div className= {`status ${!Project.status ? "notfinishedproject" : "finishedproject"}`} ></div>
        </div>
        <h2 className="projectmanagerusername">{Project.username}</h2>
        <h2 className="projectmanageremail"> email: {Project.email} </h2>
        <h3 className="description">description:</h3>
        <h3 className="projectdescription">{Project.description}</h3>
        <h2 className="projectstartdate">startdate: {extractedDate1} </h2> 
        <h2 className="projectduedate"> duedate: {extractedDate2} </h2>
        </div>
        <div className="secondpart">
        {Parts.map(Part => (
          <div className='map-parts'>
          <Link to={`/Tasks/${Project.project_id}/${Part.part_id}`} >
          <div className="Part-preview" key={Part.part_id} >
            <div className="Partinfo">
            <h2>{ Part.partname }</h2>
            </div>
            <div className="taskmanagerinfo">
            { Part.username && <p>{Part.username} is responsible for this part.</p> }
            { !Part.username && <p>this part is free</p> }
            { Part.username &&<p> email: {Part.email}. </p> }
            </div>
          </div>
          </Link>
          { !Part.username && <button className="buttontorequest" onClick={()=>{ if(!isreqclk) stisreqclk(true); else stisreqclk(false)}}>Request</button> }
          </div>
        ))}
        </div>
        <div className="thirdpart">
        </div>
      </div>
    );
  }
   
  export default PartList;