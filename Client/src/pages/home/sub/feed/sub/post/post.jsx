import { deleteObject, ref } from "firebase/storage";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "../../../../../../firebase";
import {
  updatePosts,
  updateTPosts,
} from "../../../../../../slices/feedReducer";
import "./post.css";
import rankicon from "/assets/rankPM.svg";
export default function Post({
  username,
  image,
  description,
  date,
  userima,
  userid,
  postID,
}) {
  const dateObject = new Date(date);
  dateObject.setDate(dateObject.getDate() + 1);
  // Get the date in the format "YYYY-MM-DD"
  const extractedDate = dateObject.toISOString().substring(0, 10);
  let managerrank = 0;
  const ranks = useSelector((state) => state.feed.ranks);
  const userID = useSelector((state) => state.user.userID);
  const dispatch = useDispatch();

  const deleteImage = (url) => {
    const nurl = new URL(url);
    const pathname = nurl.pathname; // This will be '/v0/b/intralink-df655.appspot.com/o/Users%20Images%2FGenryusai%20Shigekuni%20Yamamoto%2C%20Bleach%2C%20anime%2C%20warrior%2C%20art%2C%20720x1280%20wallpaper.jpg533b4ab2-78ae-4447-b629-6ef29dc3d12b'
    const imageName = decodeURIComponent(pathname.split("/o/")[1]).split(
      "?alt=media"
    )[0];
    console.log(imageName); // This will log 'Users Images/Genryusai Shigekuni Yamamoto, Bleach, anime, warrior, art, 720x1280 wallpaper.jpg533b4ab2-78ae-4447-b629-6ef29dc3d12b'
    const prevImageUrl = imageName;
    const prevImageRef = ref(storage, prevImageUrl); // get the reference from the url
    deleteObject(prevImageRef) // delete the image
      .then(() => {
        console.log("Image deleted successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  ranks.map((_rank) => {
    if (_rank.manager_id === userid) {
      managerrank = _rank.rank;
    }
  });
  const DeletePost = () => {
    const del = {
      postID: postID,
    };
    const prevurl = image;
    try {
      fetch("http://localhost:8080/post/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(del),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Error adding post`);
          }
          return res.json();
        })
        .then((data) => {
          if (prevurl != "null" && prevurl != null && prevurl != undefined) {
            console.log(prevurl);
            deleteImage(prevurl);
          }
          // console.log(data.posts.rows);
          dispatch(updatePosts(data.posts.rows));
          dispatch(updateTPosts(data.posts.rows));
        });
    } catch (err) {
      console.log(err);
    }
  };
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
            {userID === userid && (
              <div className="DeletePost" onClick={DeletePost}>
                <img src={`/assets/xmark_red.svg`} className="DeletePostIcon" />
              </div>
            )}
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
  postID: PropTypes.number.isRequired,
};
