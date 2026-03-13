import { useState, useEffect } from "react";
import axios from "axios";

const PostList = () => {
  const [userId, setUserId] = useState(1);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
      );
      setPosts(response.data);
      setLoading(false);
    };

    fetchPosts();
  }, [userId]); // ← userId가 변경될 때마다 API를 다시 호출

  return (
    <div>
      <select
        value={userId}
        onChange={(e) => setUserId(Number(e.target.value))}
      >
        <option value={1}>사용자 1</option>
        <option value={2}>사용자 2</option>
        <option value={3}>사용자 3</option>
      </select>
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostList;
