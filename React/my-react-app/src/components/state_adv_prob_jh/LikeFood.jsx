import React, { useState } from "react";
import confetti from "canvas-confetti";
// *두번째 문제
// 3번에서 만든 음식 목록에 삭제 기능을 추가하시오.
// 객체 배열({ id, name })로 변경하고,
//  각 항목 옆에 "삭제" 버튼을 추가하시오

// *3번쨰 문제
// 4번에서 만든 음식 목록에 "좋아요" 토글 기능을 추가하시오
// 객체에 liked 필드를 추가하고,
// 항목을 클릭하면 앞에 하트가 토글되게 하시오
const LikeFood = () => {
  const [foods, setFoods] = useState([
    { id: 1, name: "순대국밥", liked: false },
    { id: 2, name: "김치찌개", liked: false },
  ]);

  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim() === "") return;
    if (foods.includes(input.trim())) {
      alert("이미 목록에 있는 음식입니다.");
      return;
    }
    setFoods([...foods, { id: Date.now(), name: input }]);
    setInput("");
  };
  const handleDelete = (id) => {
    setFoods(foods.filter((food) => food.id !== id));
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };
  const handleToggle = (id) => {
    setFoods(
      foods.map((food) => {
        if (food.id === id && !food.liked) {
          // 💡 딱 '좋아요'를 누르는 순간에만 하트 폭죽 발사!
          const scalar = 2;
          const heart = confetti.shapeFromText({ text: "❤️", scalar });

          confetti({
            shapes: [heart],
            particleCount: 200, // 하트 개수
            spread: 100, // 퍼지는 범위
            origin: { y: 0.8 }, // 화면 어디서 터질지 (0.6은 중간보다 약간 아래)
          });
        }
        return food.id === id ? { ...food, liked: !food.liked } : food;
      }),
    );
  };
  return (
    <div className="card">
      <input
        autoFocus
        className="input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="button "
        onClick={handleAdd}
        style={{
          opacity: input.trim() === "" ? 0.5 : 1, // 비어있으면 흐리게
          cursor: input.trim() === "" ? "not-allowed" : "pointer", // 금지 표시
          filter: input.trim() === "" ? "grayscale(1)" : "none", // 흑백 처리
        }}
      >
        음식 추가
      </button>

      <ul>
        {foods.map((food) => (
          <li key={food.id}>
            {food.name}
            {food.liked ? "❤️" : "🩶"}
            <button className="button" onClick={() => handleToggle(food.id)}>
              좋아용
            </button>
            <button className="button" onClick={() => handleDelete(food.id)}>
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LikeFood;
