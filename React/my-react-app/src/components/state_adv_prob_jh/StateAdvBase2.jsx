import React from "react";
import ProfileCard from "./ProfileCard";
import LikeFood from "./LikeFood";
import LoginForm from "./LoginForm";
import MessageContainer from "./MessageContainer";

const StateAdvBase2 = () => {
  return (
    <>
      <ProfileCard />
      <br />
      <LoginForm />
      <br />
      <LikeFood />
      <br />
      <MessageContainer />
      <div style={{ marginBottom: "400px" }}></div>
    </>
  );
};

export default StateAdvBase2;
