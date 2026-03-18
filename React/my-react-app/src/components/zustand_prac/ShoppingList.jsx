import React from "react";
import useCartStore from "../../store/useCartStore";
import { Link } from "react-router-dom";

const ShoppingList = () => {
  const addItem = useCartStore((state) => state.addItem);

  const products = [
    { id: 1, name: "노트북", price: 1200000 },
    { id: 2, name: "마우스", price: 35000 },
    { id: 3, name: "키보드", price: 89000 },
  ];
  return (
    <>
      <div>ShoppingList</div>
      {products.map((product) => {
        return (
          <div key={product.id} className="card">
            <div>name : {product.name}</div>
            <div>price : {product.price}</div>
            <button className="button" onClick={() => addItem(product)}>
              담기
            </button>
          </div>
        );
      })}
      <Link className="button" to="/shopping-cart">
        카트로
      </Link>
    </>
  );
};

export default ShoppingList;
