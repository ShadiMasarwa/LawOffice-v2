import React from "react";
import { Link } from "react-router-dom";
import MainImage from "../../images/mainImage.webp";

const ErrorPage = () => {
  return (
    <div className="page flex-column">
      <img
        src={MainImage}
        alt="תמונה מרכזית של משרד עורכי דין"
        className="main-image"
      />
      <div>הדף המבוקש לא נמצא</div>
      <div>
        <Link to="/">לדף הבית</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
