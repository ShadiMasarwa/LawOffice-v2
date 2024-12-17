import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
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
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="false"
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
                autoComplete="false"
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
