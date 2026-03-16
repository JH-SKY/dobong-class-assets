import axios from "axios";
import React, { useEffect, useState } from "react";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0);
  // const [totalItems, setTotalItems] = useState(0);

  const LIMIT = 10;
  const TOTAL = 251;

  useEffect(() => {
    const fetchPosts = async () => {
      console.log(skip);

      const response = await axios.get(
        `https://dummyjson.com/posts?limit=${LIMIT}&skip=${skip}`,
      );
      //   console.log(response.data);
      const data = response.data;
      setPosts(data.posts);
      // setTotalItems(data.total);
    };

    fetchPosts();
  }, [skip]);

  const goFirst = () => {
    setSkip(0);
  };

  const goBack = () => {
    if (skip === 0) {
      return;
    }
    setSkip(skip - LIMIT);
  };

  const goNext = () => {
    // if (skip + LIMIT >= TOTAL) {
    //   return;
    // }
    setSkip(skip + LIMIT);
  };

  const goLast = () => {
    setSkip(Math.floor((TOTAL - 1) / LIMIT) * LIMIT);
  };

  return (
    <div className="card">
      <div>PostsPage</div>
      <div className="flex">
        <button className="button" onClick={goFirst}>
          처음으로
        </button>
        <button className="button" onClick={goBack}>
          이전
        </button>
        <button className="button" onClick={goNext}>
          다음
        </button>
        <button className="button" onClick={goLast}>
          마지막으로
        </button>
      </div>
      <div>
        {posts.map((post) => {
          return (
            <div className="card" key={post.id}>
              <div>id : {post.id}</div>
              <div>title : {post.title}</div>
              <div>body : {post.body}</div>
              <div>userId : {post.userId}</div>
              <div>views : {post.views}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostsPage;
