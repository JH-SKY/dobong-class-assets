import axios from "axios";
import React, { useEffect, useState } from "react";

const CatGallery = () => {
  const [images, setImages] = useState([]);

  const fetchCats = async () => {
    const response = await axios.get(
      "https://api.thecatapi.com/v1/images/search?limit=10",
    );
    //   console.log(response.data);
    setImages(response.data);
  };

  useEffect(() => {
    fetchCats();
  }, []); // ← 빈 배열: 처음 1번만 API 호출

  const fetchMoreCats = async () => {
    const response = await axios.get(
      "https://api.thecatapi.com/v1/images/search?limit=10",
    );
    setImages([...images, ...response.data]);
  };

  return (
    <div className="card">
      <div>CatGallery</div>
      <button onClick={fetchCats} className="button">
        갈아끼우기
      </button>
      <button onClick={fetchMoreCats} className="button">
        더보기
      </button>
      <div className="flex flex-wrap">
        {images.map((image) => {
          return <img key={image.id} src={image.url} alt="" width={100} />;
        })}
      </div>
    </div>
  );
};

export default CatGallery;
