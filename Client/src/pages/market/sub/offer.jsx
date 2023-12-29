import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import "./offer.css";
import rankicon from "/assets/rankPM.svg";
export default function Offer({
  managername,
  managerimage,
  price,
  projectname,
  description,
  startdate,
  userid,
}) {
  const dateObject = new Date(startdate);

  dateObject.setDate(dateObject.getDate() + 1);
  // Get the date in the format "YYYY-MM-DD"
  const extractedDate = dateObject.toISOString().substring(0, 10);
  let managerrank = 0;
  const ranks = useSelector((state) => state.market.ranks);
  ranks.map((_rank) => {
    if (_rank.manager_id === userid) {
      managerrank = _rank.rank;
    }
  });
  return (
    <>
      <div className="offer-container">
        <div className="offer-top">
          <div className="offer-top-left">
            <div className="offer-profile-img_container">
              <img className="offer-profile-img" src={managerimage} alt="" />
            </div>
            <div className="manager_info">
              <span className="manager-name">{managername}</span>
            </div>
          </div>
          <div className="offer-top-right">
            <div className="project_manager_rank">
              <img src={rankicon} className="project_rank_icon" />
              {Math.floor(managerrank)}
            </div>
          </div>
        </div>
        <div className="offer-center">
          <div className="project_info">
            <span className="projectname">{projectname}</span>
            <span className="offer-date">{extractedDate}</span>
          </div>
          <div className="offer-text">{description}</div>
        </div>
        <div className="offer-bottom">
          <div className="offer-bottom-left">
            <div className="offer-price"> {`Price: ${price}`}</div>
          </div>
          <div className="offer-bottom-right">
            <button className="buy-button">Buy</button>
          </div>
        </div>
      </div>
    </>
  );
}
Offer.propTypes = {
  projectname: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  startdate: PropTypes.string.isRequired,
  managername: PropTypes.string.isRequired,
  managerimage: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  userid: PropTypes.number,
};
