import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UserDetailPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const intUserId = Number(userId);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${userId}`,
      );
      setUser(response.data);
    };

    fetchUser();
  }, [userId]);

  const goNext = () => {
    const MaxNum = 10;
    if (intUserId >= MaxNum) {
      alert("마지막 사람입니다.");
      return;
    }
    navigate(`/users/${intUserId + 1}`);
  };
  const goBefore = () => {
    if (intUserId === 1) {
      alert("처음 사람입니다.");
      return;
    }
    navigate(`/users/${intUserId - 1}`);
  };

  return (
    <div>
      <div>
        <div>UserDetailPage</div>
        <div>id : {user?.id}</div>
        <div>name : {user?.name}</div>
        <div>email : {user?.email}</div>
        <div>company : {user?.company.name}</div>
      </div>
      <button onClick={() => navigate("/users")} className="button">
        뒤로가기
      </button>
      {intUserId > 1 && (
        <button onClick={goBefore} className="button">
          이전사람
        </button>
      )}

      {intUserId < 10 && (
        <button onClick={goNext} className="button">
          다음사람
        </button>
      )}
    </div>
  );
};

export default UserDetailPage;
