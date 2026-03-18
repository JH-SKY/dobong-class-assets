// src/pages/PostDetail.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
      );
      setPost(response.data);
    };

    fetchPost();
  }, [id]);

  return (
    <div className="card">
      <h1>{post?.title}</h1>
      <p>{post?.body}</p>
      <Link to="/posts" className="button">
        ← 목록으로
      </Link>
      <Link to={`/posts/${Number(id) + 1}`} className="button">
        다음 게시글
      </Link>
    </div>
  );
};

export default PostDetail;
