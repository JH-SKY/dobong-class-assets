import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserListPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users",
      );
      setUsers(response.data);
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div>UserListPage</div>
      <ul>
        {users.map((user) => {
          return (
            <li className="card">
              <Link to={`${user.id}`}>{user.name}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default UserListPage;
