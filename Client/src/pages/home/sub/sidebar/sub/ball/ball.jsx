import PropTypes from "prop-types";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTheme } from "../../../../../../slices/userReducer";
import "./ball.css";
import {useNavigate } from "react-router-dom";




export default function Ball({ specific, speed, display }) {
  const dispatch = useDispatch();
  const ballContainerRef = useRef(null);
  let theme = useSelector((state) => state.user.theme);
  const navigate = useNavigate();

  if (ballContainerRef.current != null) {
    ballContainerRef.current.style.pointerEvents = "none";
    if (display === "show") {
      ballContainerRef.current.style.transition = `all ${
        1 + (2 * speed) / 10
      }s`;
      ballContainerRef.current.style.display = "flex";
      setTimeout(() => {
        ballContainerRef.current.style.top = `${4 * speed}rem`;
        ballContainerRef.current.style.transition = `all 1s`;
      }, 50);
      setTimeout(() => {
        ballContainerRef.current.style.pointerEvents = "auto";
      }, 1000 * ((2 * speed) / 10));
    } else {
      ballContainerRef.current.style.transition = `all ${
        1 + (2 * speed) / 10
      }s`;
      ballContainerRef.current.style.top = "0rem";
      setTimeout(() => {
        if (ballContainerRef.current) {
          ballContainerRef.current.style.display = "none";
          ballContainerRef.current.style.pointerEvents = "auto";
          ballContainerRef.current.style.transition = `all 1s`;
        }
      }, 1000 + (speed - 1) * 200);
    }
  }

 
  if (specific == "Dark") {
    theme = theme.charAt(0).toUpperCase() + theme.slice(1);
    theme = theme === "Dark" ? "Light" : "Dark";
  } else {
    theme = specific;
  }

  const handleOptions = () => {
    if (theme === "Dark" || theme === "Light") {
      dispatch(updateTheme(theme.toLowerCase()));
    }
    else if (theme==="Projects") {
      navigate("/dashboard");
    }
    else if (theme==="Home") {
      navigate("/home");
    }  
    else if(theme=="Chat"){
      navigate("/chat");
    }
    else if (theme=="Hire"){
      navigate("/availabilityboard");
    }
  };

  return (
    <>
      <div
        onClick={handleOptions}
        ref={ballContainerRef}
        className={`ball-container ${theme}`}
      >
        <img src={`/assets/${theme}.svg`} className="specific_icon" />
        <div className="ball_name">{theme}</div>
      </div>
    </>
  );
}

Ball.propTypes = {
  specific: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
  display: PropTypes.string.isRequired,
};
