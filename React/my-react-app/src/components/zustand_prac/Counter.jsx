import useCounterStore from "../../store/useCounterStore";

const Counter = () => {
  const count = useCounterStore((state) => state.count);
  const increase = useCounterStore((state) => state.increase);
  const decrease = useCounterStore((state) => state.decrease);
  const reset = useCounterStore((state) => state.reset);

  return (
    <div>
      <h2>카운트: {count}</h2>
      <button className="button" onClick={increase}>
        +1
      </button>
      <button className="button" onClick={decrease}>
        -1
      </button>
      <button className="button" onClick={reset}>
        초기화
      </button>
    </div>
  );
};

export default Counter;
