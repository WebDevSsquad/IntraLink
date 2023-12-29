import { useEffect, useRef, useState } from "react";
import "./availabilityboard.css";



const availabilityboard = () => {

    const [filteredData1 , setfilteredData1] = useState(null);

    const [filteredData2, setfilteredData2] = useState(null);

    const [datatoshow,setdatatoshow] = useState(null);

    const [isdatageted , setisdatageted] = useState(false);

    const [isreqclicked , setisreqclicked] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:8080/availability/availabilitytoget`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setdatatoshow(data.ans.filter(item => item.available_con));
            setfilteredData1(data.ans.filter(item => item.available_con));
            setfilteredData2(data.ans.filter(item => item.available_tm));
            setisdatageted(true);
          });
      },[isreqclicked]);




    const buttonref1 = useRef(null);
    const buttonref2 = useRef(null);

    const  handleclick1 = () => {
        setdatatoshow(filteredData1);
        buttonref1.current.style.backgroundColor = "var(--primary-100)";
        buttonref2.current.style.backgroundColor = "var(--primary-200)";
    }

    const  handleclick2 = () => {
        setdatatoshow(filteredData2);
        buttonref1.current.style.backgroundColor = "var(--primary-200)";
        buttonref2.current.style.backgroundColor = "var(--primary-100)";
    }

    return (
        <div class="availability_main">
        <div className="centered-ava-container">
        <div className="ava-content">
        <div className="buttons-ava-container">
          <button className = "b1" onClick={() => {isdatageted && handleclick1()}} ref={buttonref1}>available for con</button>
          <button onClick={() => {isdatageted && handleclick2()}} ref={buttonref2}>available for tm</button>
        </div>
        {isdatageted && datatoshow.map( dat => (
        <div className="ava-users" key={dat.user_id}>
        <div className="username">
            <p>{isdatageted && dat.username}</p>
        </div>
        <div className="useremail">
            <p>{ isdatageted && dat.email}</p>
        </div>
        {/* <div className="userrank">
            <p>Rank: {data.rank}</p>
        </div> */}
        <button className="buttontoreq" onClick={ () => {if(!isreqclicked) setisreqclicked(true); else setisreqclicked(false)}}> Request </button>
        </div>
        ))}
        </div>
        </div>
        </div>
    );
}
   
    export default availabilityboard;