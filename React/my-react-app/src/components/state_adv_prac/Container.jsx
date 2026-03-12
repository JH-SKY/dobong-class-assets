import { useState } from "react";
import Display from "./Display";
import Controls from "./Controls";

const Container = () => {
  const [count, setCount] = useState(0);

  const increase = () => setCount(count + 1);
  const decrease = () => setCount(count - 1);

  return (
    <div>
      <Display count={count} />
      <Controls increase={increase} decrease={decrease} />
    </div>
  );
};

export default Container;
