import React from "react";
import { Outlet } from "react-router-dom";
import "./FpStyles.css";
import Header from "./FpHeader";
import Footer from "./FpFooter";

const Layout = () => {
  return (
    <>
      <div>
        <Header />
        <div className="body-container">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
