import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import styles from "./App.module.css";

import Base from "./Base";
import JsxBase from "./components/jsx_prac/JsxBase";
import PropsBase from "./components/props_prac/PropsBase";
import ChildrenBase from "./components/children_prac/ChildrenBase";
import RenderingBase from "./components/rendering_prac/RenderingBase";

function App() {
  return (
    <>
      {/* <Base /> */}
      {/* <JsxBase /> */}
      {/* <PropsBase/> */}
      {/* <ChildrenBase /> */}
      {/* CSS Practice
      <div className={styles.container}>
        <h1 className={styles.title}>Hello World!</h1>
        <div className={`${styles.container} ${styles.title}`}>내용</div>
        <div className="text-3xl font-bold text-red-500">Hello World!</div>
      </div>
      <div className="flex justify-between">
        <div>1</div>
        <div>2</div>
      </div>
      <button className="bg-blue-500 py-2 hover:bg-red-700 text-white font-bold  px-4 rounded">
        버튼
      </button> */}
      <RenderingBase />
    </>
  );
}

export default App;
