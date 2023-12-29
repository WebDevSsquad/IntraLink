import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { updateOffers, updateRanks } from "../../slices/marketReducer";
import ComboBox from "../home/sub/feed/sub/combobox/combobox";
import "./market.css";
import Offer from "./sub/offer";
import rankicon from "/assets/rankPM.svg";

export default function Market() {
  const dispatch = useDispatch();
  const addPostRef = useRef(null);
  const offers = useSelector((state) => state.market.offers);
  const [items, setItems] = useState(Array.from({ length: 20 }));
  const [toggled, setToggled] = useState(true);
  const userName = useSelector((state) => state.user.userName);
  const userPhoto = useSelector((state) => state.user.picture);
  const managerRank = useSelector((state) => state.user.managerRank);
  const selectedProject = useSelector((state) => state.feed.selectedProject);
  const price = useRef(null); 
  const fetchMoreData = () => {
    try {
      fetch("http://localhost:8080/market", {
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
          dispatch(updateOffers(data.offers.rows));
          dispatch(updateRanks(data.ranks.rows));
        });
    } catch (err) {
      console.log(err);
    }
    setTimeout(() => {
      setItems(Array.from({ length: 20 }));
    }, 1000);
  };

  const handelAddOffer = () => {
    const add = {
      projectID: selectedProject,
      price: price.current.value,
    };
    try {
      fetch("http://localhost:8080/market/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(add),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Error getting post`);
          }
          return res.json();
        })
        .then((data) => {
          dispatch(updateOffers(data.offers.rows));
          dispatch(updateRanks(data.ranks.rows));
        });
    } catch (err) {
      console.log(err);
    }
  };
  const handelOpenAddOffer = () => {
    if (addPostRef.current) {
      addPostRef.current.style.transform = `scale(${toggled & 1})`;
      setToggled(!toggled);
    }
  };
  const addPosts = (
    <div
      style={{ marginBottom: "0rem", height: `15rem` }}
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

        <div className="post-top-right">
          <div className="post_project_manager_rank">
            <img src={rankicon} className="post_rank_icon" />
            {managerRank}
          </div>
        </div>
      </div>
      <ComboBox></ComboBox>
      <input ref={price} type="number" step="1" placeholder="Enter Price"  className="addprice"/>  
      <div onClick={handelAddOffer} className="add_post-bottom-right">
        <div className="add_button" onClick={handelOpenAddOffer}>
          Add
        </div>
      </div>
    </div>
  );

  useEffect(fetchMoreData, [dispatch]);
  const addOfferButton = (
    <div onClick={handelOpenAddOffer} className={`addPostButton`}>
      <img src={`/assets/plus.svg`} className="add_post_icon" />
    </div>
  );

  return (
    <>
      <div className="market-container">
        {addOfferButton}
        {addPosts}
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={true}
          // loader={<h4 className="LoadingMessage">Loading...</h4>}
          height={"50rem"}
        >
          {offers.map((offer, index) => (
            <Offer
              key={index}
              projectname={offer.projectname}
              description={offer.description}
              startdate={offer.startdate}
              managerimage={offer.picture}
              managername={offer.username}
              price={offer.price}
              userid={offer.user_id}
            />
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
}
