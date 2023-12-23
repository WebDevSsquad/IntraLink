import PropTypes from "prop-types";
import { useRef } from "react";
import "./ball.css";
export default function Ball({ specific, speed, display }) {
  const ballContainerRef = useRef(null);

  if (ballContainerRef.current != null) {
    ballContainerRef.current.style.pointerEvents= "none"; 
    if (display === "show") {
      ballContainerRef.current.style.transition = `all ${
        1 + (2 * speed) / 10
      }s`;
      ballContainerRef.current.style.display = "flex";
      setTimeout(() => {
        ballContainerRef.current.style.pointerEvents= "auto"; 
        ballContainerRef.current.style.top = `${4 * speed}rem`;
        ballContainerRef.current.style.transition = `all 1s`;
      }, 50);
    } else {

      ballContainerRef.current.style.transition = `all ${
        1 + (2 * speed) / 10
      }s`;
      ballContainerRef.current.style.top = "0rem";
      setTimeout(() => {
        ballContainerRef.current.style.display = "none";
        ballContainerRef.current.style.pointerEvents= "auto"; 
        ballContainerRef.current.style.transition = `all 1s`;
      }, 1000+(speed-1)*200);
    }
  }
  return (
    <>
      <div
        ref={ballContainerRef}
        className={`ball-container ${specific} ball_hide`}
      >
        <img src={`/assets/${specific}.svg`} className="specific_icon" />
        <div className="ball_name">{specific}</div>
      </div>
    </>
  );
}

Ball.propTypes = {
  specific: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
  display: PropTypes.string.isRequired,
};
