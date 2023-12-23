import "./post.css";
import rankicon from "/assets/rankPM.svg";
export default function Post() {
  return (
    <>
      <div className="post-container">
        <div className="post-top">
          <div className="post-top-left">
            <div className="post-profile-img_container">
              <img
                className="post-profile-img"
                src="/assets/jogosaturu.jpeg"
                alt=""
              />
            </div>
            <div className="post_user_info">
              <span className="post-username">John Doe</span>
              <span className="post-date">5 mins ago</span>
            </div>
          </div>
          <div className="post-top-right">
            <div className="post_project_manager_rank">
              <img src={rankicon} className="post_rank_icon" />
              50
            </div>
          </div>
        </div>
        <div className="post-center">
          <span className="post-text">Hey! It&apos;s my first post!</span>
          <div className="post-img_container">
            <img className="post-img" src="/assets/text.jpg" alt="" />
          </div>
        </div>
        <div className="post-bottom-right">
          <div className="join_button">Join</div>
        </div>
      </div>
    </>
  );
}
