import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmcassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    office: "",
    fName: "",
    lName: "",
    role: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleCancel = () => {
    navigate("/");
  };

  const handleInputChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefalt();
  };

  return (
    <div className="full-container">
      <header className="header">
        <h2>יצירת משרד חדש</h2>
      </header>
      <div className="register-login_container">
        <form className="registration-login-form-container">
          <div className="registration-login-form-group">
            <input
              type="text"
              placeholder="שם המשרד"
              name="office"
              value={user.office}
              onChange={handleInputChange}
              autoFocus
              required
              autoComplete="false"
            />
            <input
              type="text"
              placeholder="שם פרטי"
              name="fName"
              value={user.fName}
              onChange={handleInputChange}
              required
              autoComplete="false"
            />
            <input
              type="text"
              placeholder="שם משפחה"
              name="lName"
              value={user.lName}
              onChange={handleInputChange}
              required
              autoComplete="false"
            />
            <input
              type="text"
              placeholder="תפקיד במשרד"
              name="role"
              value={user.role}
              onChange={handleInputChange}
              required
              autoComplete="false"
            />
            <input
              type="email"
              placeholder="אימייל ראשי"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              required
              autoComplete="false"
            />
            <input
              type="number"
              placeholder="מספר טלפון"
              name="phone"
              value={user.phone}
              onChange={handleInputChange}
              required
              autoComplete="false"
            />
            <div className="registration-login-password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="סיסמה"
                name="password"
                value={user.password}
                onChange={handleInputChange}
                required
                autoComplete="false"
              />
              <span
                className="registration-login-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
            </div>

            <div className="registration-login-password-container">
              <input
                type={showconfirmcassword ? "text" : "password"}
                placeholder="אימות סיסמה"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleInputChange}
                required
                autoComplete="false"
              />
              <span
                className="registration-login-toggle-password"
                onClick={() => setShowConfirmPassword(!showconfirmcassword)}
              >
                {showconfirmcassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
            </div>
            <div className="form-check mt-2">
              <input
                className="form-check-input "
                style={{ width: "10px", marginLeft: "10px" }}
                type="checkbox"
                value=""
                id="confirmRules"
                required
              />
              <label className="form-check-label" htmlFor="confirmRules">
                אני מאשר/ת כי קראתי את <Link to="/rules">כללי האתר</Link> ואני
                מסכים/ה להם
              </label>
            </div>
            <div className="registration-login-buttons">
              <button
                type="submit"
                className="registration-login-btn"
                onClick={handleSubmit}
              >
                הרשמה
              </button>
              <button
                type="button"
                className="registration-login-cancel-btn"
                onClick={handleCancel}
              >
                ביטול
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
