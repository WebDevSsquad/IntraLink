import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChampagneGlasses, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState,useEffect } from "react";
import PartList from "./partlist";
import "./part.css";
import { useParams } from "react-router-dom";

const Part = () => {
  const { id } = useParams();



  const [Parts , setParts] = useState(null);

  const [nParts ,setnParts] = useState(null);

  const [isdatageted, setisdatageted] = useState(false);

  const [isdatapmgeted, setisdatapmgeted] = useState(false);

  const [ isreqclicked , setisreqclicked] = useState(false);
  
  const [project ,setproject] = useState(null);

 useEffect(() => {
  const fetchData1 = async () =>{
  fetch(`http://localhost:8080/partwithpmid/pmid/${id}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setParts(data.ans);
      setnParts(data.ans);
      setisdatageted(true);
    })};


    const fetchData2 = async () =>{
      fetch(`http://localhost:8080/partwithpmid/pminfo/${id}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setproject(...data.ans);
          setisdatapmgeted(true);
        })};


    fetchData1();
    fetchData2();
},[isreqclicked]);

  
  const filter = (Partnametofind) => {
    const newParts = Parts.filter(Part => Part.partname.toLowerCase().includes(Partnametofind.toLowerCase()));
    setnParts(newParts);
  }


  return (
    <div className="Parts_main">
        <div className="search-container">
      <input onChange={(e) => {isdatageted && isdatapmgeted && filter(e.target.value)} } type="text" placeholder="Search...." className="search-bar-parts"/>
        <FontAwesomeIcon className="search-icon" icon={faSearch} />
        </div>
      { isdatageted && isdatapmgeted && <PartList Parts={nParts} Project={project} isreqclk={isreqclicked} stisreqclk={setisreqclicked} />}
    </div>
  );
}
 
export default Part;