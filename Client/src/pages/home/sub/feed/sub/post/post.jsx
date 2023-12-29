import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import "./post.css";
import rankicon from "/assets/rankPM.svg";
export default function Post({
  username,
  image,
  description,
  date,
  userima,
  userid,
}) {
  const dateObject = new Date(date);
  dateObject.setDate(dateObject.getDate() + 1);
  // Get the date in the format "YYYY-MM-DD"
  const extractedDate = dateObject.toISOString().substring(0, 10);
  let managerrank = 0;
  const ranks = useSelector((state) => state.feed.ranks);
  ranks.map((_rank) => {
    if (_rank.manager_id === userid) {
      managerrank = _rank.rank;
    }
  });
  return (
    <>
      <div className="post-container">
        <div className="post-top">
          <div className="post-top-left">
            <div className="post-profile-img_container">
              <img className="post-profile-img" src={userima} alt="" />
            </div>
            <div className="post_user_info">
              <span className="post-username">{username}</span>
              <span className="post-date">{extractedDate}</span>
            </div>
          </div>
          <div className="post-top-right">
            <div className="post_project_manager_rank">
              <img src={rankicon} className="post_rank_icon" />
              {Math.floor(managerrank)}
            </div>
          </div>
        </div>
        <div className="post-center">
          <div className="post-text">{description}</div>
          <div className="post-img_container">
            <img className="post-img" src={image} alt="" />
          </div>
        </div>
        <div className="post-bottom-right">
          <div className="join_button">Join</div>
        </div>
      </div>
    </>
  );
}
Post.propTypes = {
  username: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  userima: PropTypes.string.isRequired,
  userid: PropTypes.number.isRequired,
};
