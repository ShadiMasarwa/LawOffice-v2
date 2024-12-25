import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../images/scale.png";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className="header_container">
      <Link to="/" className="header_logo">
        <img src={Logo} alt="logo" />
        <div className="header_sitename">
          משפט נט - אתר לניהול משרד עורך דין
        </div>
      </Link>

      <div className="header_menu">
        {currentPath === "/" && (
          <>
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/login")}
            >
              כניסה
            </button>

            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/register")}
            >
              הרשמה
            </button>
          </>
        )}
        {currentPath === "/login" && (
          <>
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/register")}
            >
              הרשמה
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/")}
            >
              מסך ראשי
            </button>
          </>
        )}
        {currentPath === "/register" && (
          <>
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/login")}
            >
              כניסה
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/")}
            >
              מסך ראשי
            </button>
          </>
        )}

        <button className="header_menu_toggle">
          <FaBars />
          <AiOutlineClose />
        </button>
      </div>
    </div>
  );
};

export default Header;
