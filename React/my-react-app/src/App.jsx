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
import RenderingProb from "./components/rendering_prob/RenderingProb";
import EventBase from "./components/event_prac/EventBase";
import StateBase from "./components/state_prac/StateBase";
import StateProb from "./components/state_prob/StateProb";
import StateAdvBase from "./components/state_adv_prac/StateAdvBase";
import StateAdvProb from "./components/state_adv_prob/StateAdvProb";
import { UseEffectBase } from "./components/useeffect_prac/UseEffectBase";
import UseEffectProb from "./components/useeffect_prob/UseEffectProb";
import TodoList from "./components/fastapi_prac/TodoList";
import TodoListAdv from "./components/fastapi_prac/TodoListAdv";
import UseRefBase from "./components/useref_prac/UseRefBase";

// router에 대한 import
import { RouterProvider } from "react-router-dom";
import router from "./router";

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
      {/* <RenderingBase /> */}
      {/* <RenderingProb /> */}
      {/* <EventBase /> */}
      {/* <StateBase /> */}
      {/* <StateProb /> */}
      {/* <StateAdvBase /> */}
      {/* <StateAdvProb /> */}
      {/* <UseEffectBase /> */}
      {/* <UseEffectProb /> */}
      {/* <TodoList /> */}
      {/* <TodoListAdv /> */}
      {/* <UseRefBase /> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
