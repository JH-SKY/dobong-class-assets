import { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1",
      );
      setUser(response.data);
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h2>사용자 프로필</h2>
      {/* ❌ user가 null일 때 에러 발생 */}
      {/* <p>이름: {user.name}</p> */}
      {/* <p>도시: {user.address.city}</p> */}

      {/* ✅ 옵셔널 체이닝으로 안전하게 접근 */}
      <p>이름: {user?.name}</p>
      <p>이메일: {user?.email}</p>
      <p>도시: {user?.address?.city}</p>
      <p>회사: {user?.company?.name}</p>
    </div>
  );
};

export default UserProfile;
