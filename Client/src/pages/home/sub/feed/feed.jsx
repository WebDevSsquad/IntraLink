import {
  // deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { storage } from "../../../../firebase";
import {
  updatePosts,
  updateRanks,
  updateTPosts,
} from "../../../../slices/feedReducer";
import "./feed.css";
import ComboBox from "./sub/combobox/combobox";
import Post from "./sub/post/post";
import rankicon from "/assets/rankPM.svg";

export default function Feed() {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.userName);
  const userPhoto = useSelector((state) => state.user.picture);
  const [postImg, setPostImg] = useState("/assets/postimg.svg"); //! the uploaded image
  const [postImgUpload, setPostImgUpload] = useState(null); //!the uploaded image in base64 format
  const descriptionRef = useRef(null); //! the description of the post
  const addPostRef = useRef(null); //!
  // const posts = useSelector((state) => state.feed.posts);
  const selectedProject = useSelector((state) => state.feed.selectedProject);
  const [items, setItems] = useState(Array.from({ length: 20 }));
  const [toggled, setToggled] = useState(true);
  const managerRank = useSelector((state) => state.user.managerRank);
  const filteredposts = useSelector((state) => state.feed.tempposts);

  useEffect(() => {
    fetchMoreData();
  }, []);

  const fetchMoreData = () => {
    console.log("fetching");
    try {
      fetch("http://localhost:8080/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Error getting post`);
          }
          return res.json();
        })
        .then((data) => {
          console.log(data.posts.rows);
          dispatch(updatePosts(data.posts.rows));
          dispatch(updateTPosts(data.posts.rows));
          dispatch(updateRanks(data.ranks.rows));
        });
    } catch (err) {
      console.log(err);
    }
    setTimeout(() => {
      setItems(Array.from({ length: 20 }));
    }, 1000);
  };

  const handelUploadImage = () => {
    if (postImgUpload) {
      const imageName = postImgUpload.name + v4();
      const imageRef = ref(storage, `Post Images/${imageName}`);
      uploadBytes(imageRef, postImgUpload)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              console.log(url);
              // setImageUrl(url);
              addPost(url);
            })
            .then(() => {
              console.log("Image uploaded successfully");
              // setUploaded({ message: "true" });
            })
            .catch((error) => {
              console.log(error);
              // setUploaded({ message: "error" });
            });
        })
        .catch((error) => {
          console.log(error);
          // setUploaded({ message: "error" });
        });
    } else {
      // setUploaded({ message: "no uploaded image" });
      addPost("null");
    }
  };

  const addPost = (url) => {
    console.log(selectedProject);
    const add = {
      projectID: selectedProject,
      description: descriptionRef.current?.value,
      image: url,
    };
    try {
      fetch("http://localhost:8080/post/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(add),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Error adding post`);
          }
          return res.json();
        })
        .then((data) => {
          console.log(data.posts.rows);
          dispatch(updatePosts(data.posts.rows));
          dispatch(updateTPosts(data.posts.rows));
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handelAddPost = async () => {
    if (selectedProject === -1) {
      alert("Please select a project");
      return;
    }
    handelUploadImage();
    // setUploaded({ message: "null" });
  };

  const uploadPhoto = (
    <div className="img-container">
      <div className="img-file-container">
        <div className="img-container">
          <img src={postImg} alt="personal image" className="img" />
        </div>
        <div className="text">Upload photo</div>
        <input
          style={{ color: "red" }}
          type="file"
          className="file"
          onChange={(event) => {
            const reader = new FileReader();
            reader.onload = () => setPostImg(reader.result);
            if (event.target.files) {
              reader.readAsDataURL(event.target.files[0]);
              setPostImgUpload(event.target.files[0]);
            }
          }}
        />
      </div>
    </div>
  );
  const handelOpenAddPost = () => {
    if (addPostRef.current) {
      addPostRef.current.style.transform = `scale(${toggled & 1})`;
      setToggled(!toggled);
    }
  };
  const addPosts = (
    <div
      style={{ marginBottom: "0rem" }}
      ref={addPostRef}
      className="add-post-container"
    >
      <div className="post-top">
        <div className="post-top-left">
          <div className="post-profile-img_container">
            <img className="post-profile-img" src={userPhoto} alt="" />
          </div>
          <div className="post_user_info">
            <span className="post-username">{userName}</span>
          </div>
        </div>
        <ComboBox></ComboBox>
        <div className="post-top-right">
          <div className="post_project_manager_rank">
            <img src={rankicon} className="post_rank_icon" />
            {managerRank}
          </div>
        </div>
      </div>
      <div className="add_post-center">
        <textarea
          ref={descriptionRef}
          className="post-textarea"
          placeholder="What's on your mind?"
        ></textarea>
      </div>
      <div className="add_post-bottom">
        <div className="add_post-bottom-left">{uploadPhoto}</div>
        <div onClick={handelAddPost} className="add_post-bottom-right">
          <div className="add_button" onClick={handelOpenAddPost}>
            Add
          </div>
        </div>
      </div>
    </div>
  );

  const addPostButton = (
    <div onClick={handelOpenAddPost} className={`addPostButton`}>
      <img src={`/assets/plus.svg`} className="add_post_icon" />
    </div>
  );

  return (
    <>
      <div className="feed_container" id="feed_container">
        {addPosts}
        {addPostButton}
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={true}
          // loader={<h4 className="LoadingMessage">Loading...</h4>}
          height={"50rem"}
        >
          {filteredposts.map((post, index) => (
            <Post
              key={index}
              username={post.username}
              image={post.image}
              description={post.description}
              date={post.publishdate}
              userima={post.picture}
              userid={post.user_id}
              postID={post.post_id}
            />
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
}
