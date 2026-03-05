// foreach

const todos = ["숙제하기", "운동하기", "독서하기"];

for (const element of todos) {
  console.log(element);
}

todos.forEach((todo, index, array) => {
  console.log(`${index + 1}. ${todo}`);
});
