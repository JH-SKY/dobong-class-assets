import React from "react";
import CounterEmpty from "./CounterEmpty";
import CounterValue from "./CounterValue";
import Profile from "./Profile";
import UserList from "./UserLIst";
import UserListLoading from "./UserListLoading";
import UserListException from "./UserListException";
import UserProfile from "./UserProfile";
import PostList from "./PostList";
import TimerContainer from "./TImerContainer";

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
      {/* <UserProfile /> */}
      <PostList />
      <TimerContainer />
    </>
  );
};
