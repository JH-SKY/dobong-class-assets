import axios from "axios";
import React, { useEffect, useState } from "react";

const CatGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchCats = async () => {
      const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search?limit=10",
      );
      //   console.log(response.data);
      setImages(response.data);
    };

    fetchCats();
  }, []); // ← 빈 배열: 처음 1번만 API 호출

  //   const images = [
  //     {
  //       id: "20n",
  //       url: "https://cdn2.thecatapi.com/images/20n.gif",
  //       width: 500,
  //       height: 281,
  //     },
  //     {
  //       id: "ar1",
  //       url: "https://cdn2.thecatapi.com/images/ar1.jpg",
  //       width: 1024,
  //       height: 732,
  //     },
  //     {
  //       id: "b7m",
  //       url: "https://cdn2.thecatapi.com/images/b7m.jpg",
  //       width: 400,
  //       height: 400,
  //     },
  //     {
  //       id: "bp9",
  //       url: "https://cdn2.thecatapi.com/images/bp9.jpg",
  //       width: 612,
  //       height: 612,
  //     },
  //     {
  //       id: "bua",
  //       url: "https://cdn2.thecatapi.com/images/bua.jpg",
  //       width: 500,
  //       height: 336,
  //     },
  //     {
  //       id: "cmq",
  //       url: "https://cdn2.thecatapi.com/images/cmq.jpg",
  //       width: 3761,
  //       height: 2848,
  //     },
  //     {
  //       id: "e73",
  //       url: "https://cdn2.thecatapi.com/images/e73.jpg",
  //       width: 500,
  //       height: 402,
  //     },
  //     {
  //       id: "MTU4NTQ2MA",
  //       url: "https://cdn2.thecatapi.com/images/MTU4NTQ2MA.jpg",
  //       width: 3000,
  //       height: 4000,
  //     },
  //     {
  //       id: "YyLhgyzy5",
  //       url: "https://cdn2.thecatapi.com/images/YyLhgyzy5.jpg",
  //       width: 1280,
  //       height: 959,
  //     },
  //     {
  //       id: "84-HSUBbt",
  //       url: "https://cdn2.thecatapi.com/images/84-HSUBbt.jpg",
  //       width: 1200,
  //       height: 800,
  //     },
  //   ];

  return (
    <div className="card">
      <div>CatGallery</div>
      <div className="flex flex-wrap">
        {images.map((image) => {
          return <img key={image.id} src={image.url} alt="" width={100} />;
        })}
      </div>
    </div>
  );
};

export default CatGallery;
