import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <header>=== 공통 헤더 ===</header>
      <main>{children}</main>
      <footer>=== 공통 푸터 === </footer>
    </>
  );
};

export default Layout;
