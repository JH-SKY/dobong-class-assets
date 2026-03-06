import React from "react";
import Header from "./Header";
import Navigation from "./Navigation";
import MainContent from "./MainContent";
import SideBar from "./SideBar";
import Footer from "./Footer";

const MySite = () => {
  return (
    <>
      <Header />
      <Navigation />
      <div
        className="box"
        style={{
          display: "flex",
        }}
      >
        <MainContent />
        <SideBar />
      </div>
      <Footer />
    </>
  );
};

export default MySite;
