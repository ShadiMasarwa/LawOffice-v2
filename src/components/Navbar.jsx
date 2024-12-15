import React, { useState, useContext } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import style from "./Navbar.module.css";
import GlobalContext from "../Hooks/GlobalContext";
import logo from "../images/scale.png";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const { user, office } = useContext(GlobalContext);
  return (
    <>
      {/* Header */}
      <div className={`${style.navbar} d-flex justify-content-between`}>
        <div className="d-flex align-items-center">
          <Link to="#" className={style.menu_bars}>
            {sidebar ? (
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            ) : (
              <FaIcons.FaBars onClick={showSidebar} />
            )}
          </Link>
          <div className="text-white ps-4 fs-5">
            <img src={logo} alt="logo" className="pe-2" />
            משפט נט, ניהול משרד עורך דין
          </div>
        </div>
        <div className="text-white pe-2 fs-5">{office.name}</div>
      </div>
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
          <div className="">{user.name}</div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
