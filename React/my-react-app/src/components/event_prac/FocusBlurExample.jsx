const FocusBlurExample = () => {
  const handleFocus = () => {
    console.log("입력창에 포커스가 들어왔습니다");
  };

  const handleBlur = (event) => {
    console.log("포커스를 벗어났습니다.");

    const value = event.target.value;

    if (value.length < 2) {
      alert("2글자 이상 입력해주세요");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="이름을 입력하세요"
        onFocus={handleFocus}
        onBlur={(event) => handleBlur(event)}
      />
    </div>
  );
};

export default FocusBlurExample;
