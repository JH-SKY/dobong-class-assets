import axios from "axios";

const getPost = async () => {
  try {
    const url = "https://jsonplaceholder.typicode.com/posts/1";

    const config = {
      params: {},
      headers: {},
    };

    const response = await axios.get(url, config);

    const data = response.data;

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

getPost();

console.log("안녕하세요");
