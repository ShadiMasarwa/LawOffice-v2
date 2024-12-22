import React, { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import Toast from "../../components/Toast";
import GlobalContext from "../../Hooks/GlobalContext";
import {
  BsBuildingsFill,
  BsCalendar2WeekFill,
  BsEnvelopeAtFill,
  BsFillJournalBookmarkFill,
  BsFillPersonVcardFill,
  BsFillSignpostFill,
  BsFillTelephoneFill,
  BsGenderTrans,
  BsPersonFill,
  BsPersonWorkspace,
  BsSignpost2Fill,
  BsAsterisk,
} from "react-icons/bs";
import { data, Link } from "react-router-dom";

const RegisterUser = ({ setPage, user, setUser, handleSubmit }) => {
  const InitializeUser = () => {
    return {
      office_id: "",
      fname: "",
      mname: "",
      lname: "",
      gender: 1,
      idType: 1,
      id: 0,
      role: "",
      bar_id: "",
      state: "ישראל",
      city: "",
      address: "",
      zip: "",
      email: "",
      phones: [],
      notes: "",
      password: "",
      active: true,
      permissions: ["admin"],
      addDate: Date.now(),
      addedBy: "מנהל המערכת",
      updatedBy: null,
      updateDate: null,
    };
  };

  const fnameRef = useRef();
  const lnameRef = useRef();
  const idRef = useRef();
  const roleRef = useRef();
  const cityRef = useRef();
  const addressRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const confirmRulesRef = useRef();

  const validEmail = (e) => {
    const patt = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return patt.test(e);
  };
  const lengthCheck = /^[A-Za-z0-9!@#$%&*]{8,15}$/;
  const hasUppercase = /[A-Z]/;
  const hasNumber = /\d/;
  const hasSpecialChar = /[!@#$%&*]/;

  const ValidateData = () => {
    if (!user.fname) {
      fnameRef.current.focus();
      ShowToast(0, "לא הוכנס שם פרטי");
      return;
    }
    if (!user.lname) {
      lnameRef.current.focus();
      ShowToast(0, "לא הוכנס שם משפחה");
      return;
    }
    if (!user.id) {
      idRef.current.focus();
      ShowToast(0, "לא הוכנס מספר זיהוי");
      return;
    }
    if (!user.role) {
      roleRef.current.focus();
      ShowToast(0, "לא הוכנס תפקיד");
      return;
    }
    if (!user.city) {
      cityRef.current.focus();
      ShowToast(0, "לא הוכנס שם עיר");
      return;
    }
    if (!user.address) {
      addressRef.current.focus();
      ShowToast(0, "לא הוכנסה כתובת");
      return;
    }
    if (!user.email) {
      emailRef.current.focus();
      ShowToast(0, "לא הוכנס דואר אלקטרוני");
      return;
    }
    if (!validEmail(user.email)) {
      emailRef.current.focus();
      ShowToast(0, "הדואר האלקטרוני אינו תקין");
      return;
    }
    if (user.phones.length < 1) {
      phoneRef.current.focus();
      ShowToast(0, "לא הוכנסו מספרי טלפון");
      return;
    }
    if (!user.password) {
      passwordRef.current.focus();
      ShowToast(0, "לא הוכנס סיסמה");
      return;
    }
    if (!lengthCheck.test(user.password)) {
      passwordRef.current.focus();
      ShowToast(0, "הסיסמה חייבת להכיל בין 8-15 תווים");
      return;
    }
    if (!hasUppercase.test(user.password)) {
      passwordRef.current.focus();
      ShowToast(0, "הסיסמה חייבת להכיל אות גדולה אחת לפחות");
      return;
    }
    if (!hasNumber.test(user.password)) {
      passwordRef.current.focus();
      ShowToast(0, "הסיסמה חייבת להכיל מספר אחד לפחות");
      return;
    }
    if (!hasSpecialChar.test(user.password)) {
      passwordRef.current.focus();
      ShowToast(0, "הסיסמה חייבת להכיל תו מיוחד אחד לפחות");
      return;
    }
    if (!user.confirmPassword) {
      confirmPasswordRef.current.focus();
      ShowToast(0, "לא הוכנס אימות סיסמה");
      return;
    }
    if (user.password !== user.confirmPassword) {
      confirmPasswordRef.current.focus();
      ShowToast(0, "הסיסמה ואימות הסיסמה אינם תואמים");
      return;
    }
    if (!confirmRulesRef.current.checked) {
      confirmRulesRef.current.focus();
      ShowToast(0, "יש לאשר כי קראת את כללי האתר");
      return;
    }
    handleSubmit();
  };

  useEffect(() => {
    if (!user) setUser(InitializeUser);
  }, [setUser]);

  const [phone, setPhone] = useState({ type: 1, num: "", note: "" });
  const { toastAttributes, setToastAttributes } = useContext(GlobalContext);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };

  const handlePhoneChange = (e) => {
    const { id, value } = e.target;
    setPhone((prevPhone) => ({
      ...prevPhone,
      [id]: value,
    }));
  };

  const handleAddPhone = () => {
    if (phone.num.trim()) {
      setUser((prevUser) => ({
        ...prevUser,
        phones: [...prevUser.phones, { ...phone, id: Date.now() }],
      }));
      setPhone({ type: 1, num: "", note: "" });
    } else {
      ShowToast(0, "לא הוכנס מספר טלפון");
    }
  };

  const handleDeletePhone = (id) => {
    setUser((prevUser) => ({
      ...prevUser,
      phones: prevUser.phones.filter((phone) => phone.id !== id),
    }));
  };

  const ShowToast = (result, message) => {
    const on = { visible: true, result: result, body: message };
    const off = { visible: false, result: false, body: "" };

    setToastAttributes(on);

    setTimeout(() => {
      setToastAttributes(off);
    }, 3000);
  };

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div className="">
      {toastAttributes.visible && <Toast />}
      <header className="header">
        <h2>יצירת משרד חדש</h2>
      </header>
      {/* -------------------------------User Details-------------------------------- */}
      <div className="container pt-3">
        <h4 className="text-primary">פרטי משתמש ראשי</h4>
        <form className="row g-3" noValidate>
          <div className="col-md-3">
            <div className="input-group ">
              <span className="input-group-text">
                <BsPersonFill />
              </span>
              <input
                type="text"
                className="form-control"
                id="fname"
                value={user.fname || ""}
                onChange={handleInputChange}
                placeholder="שם פרטי"
                ref={fnameRef}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="input-group ">
              <span className="input-group-text">
                <BsPersonFill />
              </span>
              <input
                type="text"
                className="form-control"
                id="mname"
                value={user.mname || ""}
                onChange={handleInputChange}
                placeholder="שם אב"
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="input-group ">
              <span className="input-group-text">
                <BsPersonFill />
              </span>
              <input
                type="text"
                className="form-control"
                id="lname"
                value={user.lname || ""}
                onChange={handleInputChange}
                placeholder="שם משפחה"
                ref={lnameRef}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="input-group ">
              <span className="input-group-text">
                <BsGenderTrans />
              </span>
              <select
                className="form-select"
                id="gender"
                value={user.gender || 1}
                onChange={handleInputChange}
              >
                <option defaultValue disabled>
                  מין
                </option>
                <option value={1}>נקבה</option>
                <option value={2}>זכר</option>
                <option value={3}>אחר</option>
              </select>
            </div>
          </div>
          <div className="col-md-3">
            <div className="input-group ">
              <span className="input-group-text">
                <BsFillPersonVcardFill />
              </span>
              <select
                className="form-select"
                id="idType"
                value={user.idType || 1}
                onChange={handleInputChange}
              >
                <option defaultValue disabled value="">
                  סוג זיהוי
                </option>
                <option value={1}>תעודת זהות</option>
                <option value={2}>מספר חברה</option>
                <option value={3}>דרכון זר</option>
              </select>
            </div>
          </div>
          <div className="col-md-3">
            <div className="input-group ">
              <span className="input-group-text">
                <BsFillPersonVcardFill />
              </span>
              <input
                type="text"
                className="form-control"
                id="id"
                value={user.id || ""}
                onChange={handleInputChange}
                placeholder="מספר זיהוי"
                ref={idRef}
              />
            </div>
          </div>

          <div className="col-md-3">
            <div className="input-group ">
              <span className="input-group-text">
                <BsPersonWorkspace />
              </span>
              <input
                type="text"
                className="form-control"
                id="role"
                value={user.role || ""}
                onChange={handleInputChange}
                placeholder="תפקיד במשרד"
                ref={roleRef}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="input-group ">
              <span className="input-group-text">
                <BsPersonWorkspace />
              </span>
              <input
                type="text"
                className="form-control"
                id="bar_id"
                value={user.bar_id || ""}
                onChange={handleInputChange}
                placeholder="מספר רישיון"
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="input-group ">
              <span className="input-group-text">
                <BsSignpost2Fill />
              </span>
              <input
                type="text"
                className="form-control"
                id="state"
                value={user.state || "ישראל"}
                onChange={handleInputChange}
                placeholder="מדינה"
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="input-group ">
              <span className="input-group-text">
                <BsFillSignpostFill />
              </span>
              <input
                type="text"
                className="form-control"
                id="city"
                value={user.city || ""}
                onChange={handleInputChange}
                required
                placeholder="עיר"
                ref={cityRef}
              />
              <div className="invalid-feedback">יש להכניס שם עיר.</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="input-group ">
              <span className="input-group-text">
                <BsBuildingsFill />
              </span>
              <input
                type="text"
                className="form-control"
                id="address"
                value={user.address || ""}
                onChange={handleInputChange}
                placeholder="כתובת"
                ref={addressRef}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="input-group ">
              <span className="input-group-text">
                <BsBuildingsFill />
              </span>
              <input
                type="text"
                className="form-control"
                id="zip"
                value={user.zip || ""}
                onChange={handleInputChange}
                placeholder="מיקוד"
              />
            </div>
          </div>

          <div className="col-md-3">
            <div className="input-group ">
              <span className="input-group-text">
                <BsEnvelopeAtFill />
              </span>
              <input
                type="email"
                className="form-control text-end"
                id="email"
                value={user.email || ""}
                onChange={handleInputChange}
                placeholder="דואר אלקטרוני"
                ref={emailRef}
              />
            </div>
          </div>
          <div className="col-md-2">
            <div className="input-group ">
              <span className="input-group-text">
                <BsFillTelephoneFill />
              </span>
              <select
                className="form-select"
                id="type"
                value={phone.type}
                onChange={handlePhoneChange}
              >
                <option defaultValue disabled value="">
                  סוג טלפון
                </option>
                <option value={1}>סלולרי</option>
                <option value={2}>בית</option>
                <option value={3}>פקס בבית</option>
                <option value={4}>טלפון בעבודה</option>
                <option value={5}>פקס בעבודה</option>
                <option value={6}>אחר</option>
              </select>
            </div>
          </div>
          <div className="col-md-2">
            <div className="input-group ">
              <span className="input-group-text">
                <BsFillTelephoneFill />
              </span>
              <input
                type="text"
                className="form-control text-end"
                id="num"
                value={phone.num}
                onChange={handlePhoneChange}
                placeholder="טלפון"
                ref={phoneRef}
              />
            </div>
          </div>
          <div className="col-md-2">
            <div className="input-group ">
              <span className="input-group-text">
                <BsFillJournalBookmarkFill />
              </span>
              <input
                type="text"
                className="form-control"
                id="note"
                value={phone.note}
                onChange={handlePhoneChange}
                placeholder="הערה לטלפון"
              />
            </div>
          </div>
          <div className="col-md-3 d-flex gap-1">
            <div className="col-md-1">
              <button
                type="button"
                id="addPhone"
                className="btn btn-success"
                onClick={handleAddPhone}
              >
                +
              </button>
            </div>
            <div className="col-md-11 ">
              <table className="table table-striped  w-100">
                <thead>
                  <tr>
                    <th scope="col" className="py-0">
                      #
                    </th>
                    <th scope="col" className="py-0">
                      טלפון
                    </th>
                    <th scope="col" className="py-0">
                      מחק
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {user.phones.map((phone, index) => (
                    <tr key={phone.id}>
                      <th scope="row" className="py-0">
                        {index + 1}
                      </th>
                      <td className="py-0">{phone.num}</td>
                      <td className="py-0">
                        <span
                          className="text-danger"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDeletePhone(phone.id)}
                        >
                          <i className="bi bi-trash3-fill fs-7"></i>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-12 ">
            <div className="input-group ">
              <span className="input-group-text">
                <BsFillJournalBookmarkFill />
              </span>
              <textarea
                className="form-control"
                id="notes"
                value={user.notes || ""}
                onChange={handleInputChange}
                rows="3"
                placeholder="הערות"
              ></textarea>
            </div>
          </div>
          <div>
            <div className="col-md-4 ">
              <div className="input-group ">
                <span className="input-group-text">
                  <BsAsterisk />
                </span>
                <input
                  className="form-control text-end"
                  id="password"
                  type="password"
                  value={user.password || ""}
                  onChange={handleInputChange}
                  placeholder="סיסמת משתמש אישית"
                  ref={passwordRef}
                ></input>
              </div>
            </div>
            <div className="col-md-4 ">
              <div className="input-group">
                <span className="input-group-text">
                  <BsAsterisk />
                </span>
                <input
                  className="form-control text-end"
                  id="confirmPassword"
                  type="password"
                  value={user.confirmPassword || ""}
                  onChange={handleInputChange}
                  placeholder="אימות סיסמה"
                  ref={confirmPasswordRef}
                ></input>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="input-group ">
              <span className="input-group-text">
                <BsCalendar2WeekFill />
              </span>
              <input
                type="text"
                className="form-control"
                id="add_date"
                placeholder="מועד הוספה"
                value={new Date().toLocaleString("en-GB", { hour12: false })}
                disabled
              />
            </div>
          </div>

          <div className="col-md-3">
            <div className="input-group ">
              <span className="input-group-text">
                <BsPersonFill />
              </span>
              <input
                type="text"
                className="form-control"
                id="add_user"
                placeholder="נוסף על ידי"
                value="מנהל מערכת"
                disabled
              />
            </div>
          </div>
          <div className="form-check mt-4 ps-5">
            <input
              className="form-check-input"
              type="checkbox"
              id="confirmRules"
              ref={confirmRulesRef}
            />
            <label className="form-check-label" htmlFor="confirmRules">
              אני מאשר/ת כי קראתי את{" "}
              <Link to="/rules" target="_blank" rel="noopener noreferrer">
                כללי האתר
              </Link>{" "}
              ואני מסכים/ה להם
            </label>
          </div>

          <div className="col-12 d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => setPage(1)}
            >
              חזרה להגדרות משרד
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={ValidateData}
            >
              רישום משרד חדש
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
