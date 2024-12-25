import React, { useState, useContext } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import GlobalContext from "../../Hooks/GlobalContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { setUserDetails, setOfficeDetails, setAccessToken } =
    useContext(GlobalContext);
  axios.defaults.baseURL = "http://localhost:3500/api/office";

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/login", {
        email,
        password,
      });
      const data = response.data;
      if (data.success) {
        // Store user and office data in state
        setUserDetails({
          _id: data.user._id,
          fname: data.user.fname,
          lname: data.user.lname,
          permissions: data.user.permissions,
        });

        setOfficeDetails({
          _id: data.office._id,
          name: data.office.name,
        });

        // Store the access token (e.g., in localStorage or state)
        setAccessToken(data.accessToken);
        navigate("/home");
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="full-container">
      <header className="header">
        <h2>התחברות</h2>
      </header>
      <section className="register-login_container">
        <form className="registration-login-form-container">
          <div className="registration-login-form-group">
            <input
              type="email"
              placeholder="אימייל"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              required
              autoComplete="email"
              name="email"
            />
          </div>
          <div className="registration-login-form-group">
            <div className="registration-login-password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="סיסמה"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                name="password"
              />
              <span
                type="button"
                className="registration-login-toggle-password"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
            </div>
          </div>
          <div className="registration-login-buttons">
            <button className="registration-login-btn" onClick={handleLogin}>
              התחבר
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
