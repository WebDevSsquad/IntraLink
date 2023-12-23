import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./feed.css";
import Post from "./sub/post";
export default function Feed() {
  const [items, setItems] = useState(Array.from({ length: 10 }));
  const [hasMore, setHasMore] = useState(true);

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

  return (
    <>
      <div className="feed_container">
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          height={"49rem"}
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
