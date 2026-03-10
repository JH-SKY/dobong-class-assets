const ChangeExample = () => {
  const handleChange = (event) => {
    console.log(`입력 이벤트 발생, 입력 값: ${event.target.value}`);
    // 구글 검색의 경우, 입력값에 대해서 추천검색어를 받아와서 보여줘.
  };

  return (
    <div>
      <input type="text" onChange={(event) => handleChange(event)} />
    </div>
  );
};

export default ChangeExample;
