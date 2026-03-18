import React from "react";
import { Outlet } from "react-router-dom";

const ShopSimpleLayout = () => {
  return (
    <>
      <h1>MyShop</h1>
      <Outlet />
    </>
  );
};

export default ShopSimpleLayout;
