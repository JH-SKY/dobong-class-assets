import axios from "axios";
import React, { useState, useEffect, useEffectEvent } from "react";
const buttoncss =
  "bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded m-1 text-sm";

const ProductJh = () => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("id");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    const fetchProucts = async () => {
      const response = await axios.get(
        `https://dummyjson.com/products?sortBy=${sortBy}&order=${order}`,
      );
      const data = response.data;
      setProducts(data.products);
    };

    fetchProucts();
  }, [setSortBy, setOrder]);

  return (
    <div>
      <div>
        <button
          className={buttoncss}
          onClick={() => {
            setSortBy("id");
            setOrder("asc");
          }}
        >
          ID ↑
        </button>
        <button
          className={buttoncss}
          onClick={() => {
            setSortBy("id");
            setOrder("desc");
          }}
        >
          ID ↓
        </button>
        <button
          className={buttoncss}
          onClick={() => {
            setSortBy("price");
            setOrder("asc");
          }}
        >
          가격 ↑
        </button>
        <button
          className={buttoncss}
          onClick={() => {
            setSortBy("price");
            setOrder("desc");
          }}
        >
          가격 ↓
        </button>
        <button
          className={buttoncss}
          onClick={() => {
            setSortBy("rating");
            setOrder("asc");
          }}
        >
          평점 ↑
        </button>
        <button
          className={buttoncss}
          onClick={() => {
            setSortBy("rating");
            setOrder("desc");
          }}
        >
          평점 ↓
        </button>
      </div>
    </div>
  );
};

export default ProductJh;
