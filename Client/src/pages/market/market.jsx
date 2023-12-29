import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { updateOffers, updateRanks } from "../../slices/marketReducer";
import "./market.css";
import Offer from "./sub/offer";

export default function Market() {
  const dispatch = useDispatch();

  const offers = useSelector((state) => state.market.offers);
  const [items, setItems] = useState(Array.from({ length: 20 }));
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
          console.log(data.ranks.rows);
          dispatch(updateOffers(data.offers.rows));
          dispatch(updateRanks(data.ranks.rows));
          console.log(ranks[0].rank);
        });
    } catch (err) {
      console.log(err);
    }
    setTimeout(() => {
      setItems(Array.from({ length: 20 }));
    }, 1000);
  };

  useEffect(fetchMoreData, [dispatch]);

  return (
    <>
      <div className="market-container">
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
