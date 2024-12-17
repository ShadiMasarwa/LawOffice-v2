import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/scale.png";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
const Header = () => {
  return (
    <div className="header_container">
      <Link to="/" className="header_logo">
        <img src={Logo} alt="logo" />
        <div className="header_sitename">משפט נט - ניהול משרד עורך דין</div>
      </Link>

      <div className="header_menu">
        <Link to="login" className="header_menu_item">
          כניסה
        </Link>
        <Link to="/" className="header_menu_item">
          יציאה
        </Link>
        <Link to="register" className="header_menu_item">
          הרשמה
        </Link>
        <button className="header_menu_toggle">
          <FaBars />
          <AiOutlineClose />
        </button>
      </div>
    </div>
  );
};

export default Header;
