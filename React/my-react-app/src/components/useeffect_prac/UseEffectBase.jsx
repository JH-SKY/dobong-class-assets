import React from "react";
import CounterEmpty from "./CounterEmpty";
import CounterValue from "./CounterValue";
import Profile from "./Profile";
import UserList from "./UserLIst";
import UserListLoading from "./UserListLoading";
import UserListException from "./UserListException";
import MovieList from "./MovieList";

export const UseEffectBase = () => {
  return (
    <>
      <div>UseEffectBase</div>
      {/* <CounterEmpty />
      <CounterValue />
      <Profile />
      <UserList /> */}
      {/* <UserListLoading /> */}
      {/* <UserListException /> */}
      <MovieList />
    </>
  );
};
