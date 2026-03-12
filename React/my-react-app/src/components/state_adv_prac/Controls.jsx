const Controls = ({ increase, decrease }) => {
  return (
    <div>
      <button className="button" onClick={increase}>
        +1
      </button>
      <button className="button" onClick={decrease}>
        -1
      </button>
    </div>
  );
};

export default Controls;
