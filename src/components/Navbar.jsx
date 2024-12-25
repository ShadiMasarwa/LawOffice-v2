import React, { useState, useContext } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdLogOut } from "react-icons/io";

import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import style from "./Navbar.module.css";
import GlobalContext from "../Hooks/GlobalContext";
import logo from "../images/scale.png";
import Footer from "./Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function Navbar({ children }) {
  const [sidebar, setSidebar] = useState(true);
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
        setUserDetails(null);
        setOfficeDetails(null);
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
      <div className={`${style.navbar} d-flex justify-content-between `}>
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
          <span className="text-warning fw-bold">משרד:</span>{" "}
          {officeDetails.name}
          <span className="text-warning fw-bold"> משתמש:</span>{" "}
          {userDetails.fname} {userDetails.lname}
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip id="tooltip-top">התנתק</Tooltip>}
          >
            <span
              className="text-danger"
              style={{ cursor: "pointer" }}
              onClick={logout}
            >
              <IoMdLogOut />
            </span>
          </OverlayTrigger>
        </div>{" "}
      </div>
      <div className="container z-index-1">{children}</div>
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
                  <Link to={`/${item?.path}`}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
      <Footer />
    </>
  );
}

export default Navbar;
