import React from "react";
import "./FpStyles.css";
import Header from "./FpHeader";
import Footer from "./FpFooter";

const Layout = ({ children }) => {
  return (
    <>
      <div>
        <Header />
        <div className="body-container">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
