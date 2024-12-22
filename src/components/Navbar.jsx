import React, { useState, useContext } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdLogOut } from "react-icons/io";

import { Link, Outlet } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import style from "./Navbar.module.css";
import GlobalContext from "../Hooks/GlobalContext";
import logo from "../images/scale.png";
import Footer from "./Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const {
    userDetails,
    setUserDetails,
    officeDetails,
    setOfficeDetails,
    setAccessToken,
  } = useContext(GlobalContext);

  const navigate = useNavigate();
  const logout = async () => {
    try {
      const response = await axios.post("/logout");
      const data = response.data;
      if (data.success) {
        // Clear user and office data from state
        setUserDetails(null);
        setOfficeDetails(null);
        // Clear the access token (e.g., from localStorage or state)
        setAccessToken(null);
        navigate("/");
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Logout Error:", error.response?.data || error.message);
    }
  };
  return (
    <>
      {/* Header */}
      <div className={`${style.navbar} d-flex justify-content-between`}>
        <div className="d-flex align-items-center">
          <Link to="#" className={style.menu_bars}>
            {sidebar ? (
              <AiOutlineClose onClick={showSidebar} />
            ) : (
              <FaBars onClick={showSidebar} />
            )}
          </Link>
          <div className="text-white ps-4 fs-5">
            <img src={logo} alt="logo" className="pe-2" />
            משפט נט, אתר לניהול משרד עורך דין
          </div>
        </div>
        <div className="text-white pe-2 fs-7">
          <span className="text-warning">משרד:</span> {officeDetails.name}
          <span className="text-warning"> משתמש:</span> {userDetails.fname}{" "}
          {userDetails.lname}
          <span className="text-danger" onClick={logout}>
            <IoMdLogOut />
          </span>
        </div>{" "}
      </div>
      <Outlet />
      <nav
        className={
          sidebar ? `${style.nav_menu} ${style.active}` : style.nav_menu
        }
      >
        {/* Sidebar */}
        <div className="d-flex flex-column justify-content-between">
          <ul className={style.nav_menu_items} onClick={showSidebar}>
            {SidebarData.map((item, index) => {
              const itemClasses = item.cName
                .map((clsname) => style[clsname])
                .join(" ");
              return (
                <li key={index} className={itemClasses}>
                  <Link to={item?.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="">{userDetails.name}</div>
        </div>
      </nav>
      <Footer />
    </>
  );
}

export default Navbar;
