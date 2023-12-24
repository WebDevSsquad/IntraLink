import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import "./feed.css";
import Post from "./sub/post";
import rankicon from "/assets/rankPM.svg";
export default function Feed() {
  const [items, setItems] = useState(Array.from({ length: 10 }));
  const [hasMore, setHasMore] = useState(true);
  const userName = useSelector((state) => state.user.userName);
  const userPhoto = useSelector((state) => state.user.picture);
  const fetchMoreData = () => {
    if (items.length >= 50) {
      setHasMore(false);
      return;
    }

    // a fake async api call
    setTimeout(() => {
      setItems(items.concat(Array.from({ length: 10 })));
    }, 500);
  };
  const addPosts = (
    <div style={{marginBottom:"0rem"}} className="post-container">
      <div className="post-top">
        <div className="post-top-left">
          <div className="post-profile-img_container">
            <img className="post-profile-img" src={userPhoto} alt="" />
          </div>
          <div className="post_user_info">
            <span className="post-username">{userName}</span>
          </div>
        </div>
        <div className="post-top-right">
          <div className="post_project_manager_rank">
            <img src={rankicon} className="post_rank_icon" />
            50
          </div>
        </div>
      </div>
      <div className="add_post-center">
        <textarea
          className="post-textarea"
          placeholder="What's on your mind?"
        ></textarea>
      </div>
      <div className="add_post-bottom-right">
        <div className="add_button">Add</div>
      </div>
    </div>
  );
  return (
    <>
      <div className="feed_container">
        {addPosts}
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          height={"32rem"}
          style={{}}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {items.map((_, index) => (
            <Post key={index} />
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
}
