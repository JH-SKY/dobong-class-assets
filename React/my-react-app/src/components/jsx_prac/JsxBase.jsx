import React from "react";
import Article from "./Article";
import TagsComponent from "./TagsComponent";
import Todos from "./Todos";
import Hello from "./Hello";
import ProfileCard from "./ProfileCard";
import MenuBoard from "./MenuBoard";

import MySite from "./mysite/MySite";

const JsxBase = () => {
  return (
    <>
      <h1>JsxBase</h1>
      <Article />
      <hr />
      <TagsComponent />
      <hr />
      <Todos />
      <hr />
      <Hello />
      <hr />
      <ProfileCard />
      <hr />
      <MenuBoard />
      <hr />
      <MySite />
      <div style={{ height: "100vh" }}></div>
    </>
  );
};

export default JsxBase;
