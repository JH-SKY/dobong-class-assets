import React from "react";
import Counter from "./Counter";
import CounterState from "./CounterState";
import Toggle from "./Toggle";
import Greeting from "./Greeting";
import SignupForm from "./SignupForm";

const StateBase = () => {
  return (
    <>
      <div>StateBase</div>
      {/* <Counter /> */}
      <CounterState />
      <Toggle />
      <Greeting />
      <SignupForm />
    </>
  );
};

export default StateBase;
