import React from "react";
import useCartStore from "../../store/useCartStore";
import { Link } from "react-router-dom";

const ShoppingCart = () => {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearItems = useCartStore((state) => state.clearItems);

  const total = items.reduce((prev, curr) => {
    return prev + curr.price * curr.quantity;
  }, 0);

  return (
    <div>
      <div>ShoppingCart</div>
      {items.map((product) => {
        return (
          <div key={product.id} className="card">
            <div>name : {product.name}</div>
            <div>price : {product.price}</div>
            <div>quantity : {product.quantity}</div>
            <button className="button" onClick={() => removeItem(product.id)}>
              삭제
            </button>
          </div>
        );
      })}
      <div>총가격 : {total}</div>
      <button className="button" onClick={clearItems}>
        클리어
      </button>
      <Link className="button" to="/shopping">
        리스트로
      </Link>
    </div>
  );
};

export default ShoppingCart;
