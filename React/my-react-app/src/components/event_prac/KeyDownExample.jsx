const KeyDownExample = () => {
  const handleKeyDown = (event) => {
    console.log(event.target.value);

    if (event.key === "Enter") {
      alert(`입력 값: ${event.target.value}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter 키를 눌러보세요"
        onKeyDown={(event) => handleKeyDown(event)}
      />
    </div>
  );
};

export default KeyDownExample;
