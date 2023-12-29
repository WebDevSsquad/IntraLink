import check from "/assets/check.svg";
import greencheck from "/assets/check_green.svg";
import redxmark from "/assets/xmark_red.svg";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./card.css";
import { Link, useNavigate } from "react-router-dom";

export default function Cards() {

        const navigate = useNavigate();

        const logged_id = useSelector((state) => state.user.userID);

        const [allusershavesub ,setallusershavesub] = useState(null);

        const [isdatageted ,setisdatageted] = useState(false);

        const [newdata,setnewdata] = useState(null);


        const checkuser = ()=>{
            const bol = allusershavesub.filter(Part => Part.user_id==logged_id);

            if(bol.length===0)return true;
            else return false;
          };


        const setdata = (mod)=>{
            if(mod===2)
            {
                let mode = "premium";
                let price =  50;
                let startdate = new Date();
                let enddate = new Date();
                enddate.setDate(startdate.getDate() + 30);  
                setnewdata((prevData) => ({
                    ...prevData,
                    mode: mode,
                    price: price,
                    startdate: startdate,
                    enddate: enddate,
                  }));         
            }
            else{
                let mode = "enterprise";
                let price =  200;
                let startdate = new Date();
                let enddate = new Date();
                enddate.setDate(startdate.getDate() + 360); 
                setnewdata((prevData) => ({
                    ...prevData,
                    mode: mode,
                    price: price,
                    startdate: startdate,
                    enddate: enddate,
                  }));
            }
        }


      const handleusersub = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/subscription/sub/${logged_id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newdata)
            }
          );
          const updatedData = await response.json();
          console.log(updatedData);
          navigate("/home");
        } catch (error) {
          console.error("Error updating user data:", error);
        }
      };


      useEffect(() => {
        const fetchData1 = async () =>{
        fetch(`http://localhost:8080/subscription/sub/getalluser`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data.ans);
            setallusershavesub(data.ans);
            setisdatageted(true);
          })};

          fetchData1();
      },[]);


      useEffect(() => {
        if(newdata !== null)
        {
            handleusersub();
        }
      },[newdata]);


  return (
    <>
      { isdatageted && checkuser() && 
      <div className="subscriptioncards" id="subscriptioncards">
        <div className="pricingcards enterprisee" onClick={()=>{setdata(1)}}>
          <div className="titlee ">Enterprise</div>
          <h1>$199</h1>
          <div>per year</div>
          <div className="pricingdescription">
            <img src={check} />
            <div className="propertyy">Lorem ipsum dolor sit.</div>
          </div>
          <div className="pricingdescription">
            <img src={check} />
            <div className="propertyy">Lorem ipsum dolor sit.</div>
          </div>
          <div className="pricingdescription">
            <img src={check} />
            <div className="propertyy">Lorem ipsum dolor sit.</div>
          </div>
          <div className="pricingdescription">
            <img src={check} />
            <div className="propertyy">Lorem ipsum dolor sit.</div>
          </div>
          <div className="pricingdescription">
            <img src={check} />
            <div className="propertyy">Lorem ipsum dolor sit.</div>
          </div>
        </div>
        <div className="pricingcards  premiumm" onClick={()=>{setdata(2)}}>
          <div className="titlee ">Premium</div>
          <h1>$50</h1>
          <div>per month</div>
          <div className="pricingdescription">
            <img src={greencheck} />
            <div className="propertyy">Lorem ipsum dolor sit.</div>
          </div>
          <div className="pricingdescription">
            <img src={greencheck} />
            <div className="propertyy">Lorem ipsum dolor sit.</div>
          </div>
          <div className="pricingdescription">
            <img src={greencheck} />
            <div className="propertyy">Lorem ipsum dolor sit.</div>
          </div>
          <div className="pricingdescription">
            <img src={greencheck} />
            <div className="propertyy">Lorem ipsum dolor sit.</div>
          </div>
          <div className="pricingdescription">
            <img src={redxmark} />
            <div className="propertyy">Lorem ipsum dolor sit.</div>
          </div>
        </div>
      </div>
      }
      {isdatageted && !checkuser() && 
      <div className="notsub">
      <div className="alreadysubscripe">you are already subscribed </div>
      <button className="buttoreturnhome" onClick={()=>{
        navigate("/home");
      }}>Return Home</button>
      </div>
      }
    </>
  );
}
