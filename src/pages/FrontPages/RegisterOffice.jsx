import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../Hooks/GlobalContext";
import axios from "axios";

import {
  BsBuildingsFill,
  BsEnvelopeAtFill,
  BsFillJournalBookmarkFill,
  BsFillSignpostFill,
  BsFillTelephoneFill,
  BsPersonFill,
  BsSignpost2Fill,
  BsFillTrash3Fill,
} from "react-icons/bs";

const RegisterOffice = ({ setPage, office, setOffice }) => {
  const { ShowToast } = useContext(GlobalContext);
  const navigate = useNavigate();

  const InitializeOffice = () => {
    return {
      name: "",
      email: "",
      phones: [],
      state: "ישראל",
      city: "",
      address: "",
      zip: "",
      active: true,
      days: -1,
      addDate: Date.now(),
      addedBy: "מנהל המערכת",
      updateDate: null,
      updatedBy: null,
    };
  };

  const nameRef = useRef();
  const emailRef = useRef();
  const cityRef = useRef();
  const addressRef = useRef();
  const zipRef = useRef();
  const phoneRef = useRef();

  const validEmail = (e) => {
    const patt = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return patt.test(e);
  };

  const AvailableEmail = async (email) => {
    try {
      const response = await axios.post(
        "http://localhost:3500/api/office/checkemail",
        { email }
      );
      return response.data.success;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log("Email already exists:", error.response.data.message);
        return false;
      }
      console.error("Error submitting data:", error);
      throw new Error(
        "An unexpected error occurred while checking email availability."
      );
    }
  };

  const ValidateForm = async () => {
    if (office.name.trim() === "") {
      ShowToast(0, "לא הוכנס שם משרד");
      nameRef.current.focus();
      return;
    }
    if (office.email.trim() === "") {
      ShowToast(0, "לא הוכנס דואר אלקטרוני");
      emailRef.current.focus();
      return;
    }
    if (!validEmail(office.email)) {
      ShowToast(0, "דואר אלקטרוני לא תקין");
      emailRef.current.focus();
      return;
    }
    if (!(await AvailableEmail(office.email.trim().toLowerCase()))) {
      ShowToast(0, "דואר אלקטרוני כבר קיים במערכת");
      emailRef.current.focus();
      return;
    }
    if (office.city.trim() === "") {
      ShowToast(0, "לא הוכנס שם עיר");
      cityRef.current.focus();
      return;
    }
    if (office.address.trim() === "") {
      ShowToast(0, "לא הוכנסה כתובת");
      addressRef.current.focus();
      return;
    }
    if (office.zip.trim() === "") {
      ShowToast(0, "לא הוכנס מיקוד");
      return;
    }
    if (office.phones.length === 0) {
      ShowToast(0, "לא הוכנסו טלפונים");
      phoneRef.current.focus();
      return;
    }

    setPage(2);
  };
  useEffect(() => {
    if (!office) setOffice(InitializeOffice());
  }, [office, setOffice]);

  const [officePhone, setOfficePhone] = useState(
    {
      type: 1,
      num: "",
      note: "",
    },
    [office]
  );

  if (!office) {
    return <div>Loading...</div>;
  }

  const handleOfficeInputChange = (e) => {
    const { id, value } = e.target;
    setOffice((prevOffice) => ({
      ...prevOffice,
      [id]: id === "email" ? value.toLowerCase() : value,
    }));
  };

  const handleOfficePhoneChange = (e) => {
    const { id, value } = e.target;
    setOfficePhone((prevPhone) => ({
      ...prevPhone,
      [id]: value,
    }));
  };

  const handleOfficeAddPhone = () => {
    if (officePhone.num.trim()) {
      setOffice((prevOffice) => ({
        ...prevOffice,
        phones: [...prevOffice.phones, { ...officePhone, id: Date.now() }],
      }));
      setOfficePhone({ type: 1, num: "", note: "" });
    } else {
      ShowToast(0, "לא הוכנס מספר טלפון");
    }
  };

  const handleOfficeDeletePhone = (id) => {
    setOffice((prevOffice) => ({
      ...prevOffice,
      phones: prevOffice.phones.filter((officePhone) => officePhone.id !== id),
    }));
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="">
      <header className="header">
        <h2>יצירת משרד חדש</h2>
      </header>
      {/* -------------------------------Office Details-------------------------------- */}
      <div className="container pt-3">
        <h4 className="text-primary">פרטי משרד</h4>
        <form className="">
          <div className="row gap-3">
            <div className="col-12 pb-3">
              <div className="input-group">
                <span className="input-group-text">
                  <BsPersonFill />
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={office.name || ""}
                  onChange={handleOfficeInputChange}
                  placeholder="שם משרד"
                  ref={nameRef}
                />
              </div>
            </div>
          </div>
          <div className="col-md-12 pb-3">
            <div className="input-group has-validation">
              <span className="input-group-text">
                <BsEnvelopeAtFill />
              </span>
              <input
                type="email"
                className="form-control text-center"
                id="email"
                value={office.email || ""}
                onChange={handleOfficeInputChange}
                placeholder="דואר אלקטרוני ראשי"
                ref={emailRef}
              />
            </div>
          </div>
          <div className="row pb-3">
            <div className="col-md-3">
              <div className="input-group">
                <span className="input-group-text">
                  <BsSignpost2Fill />
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  value={office.state || "ישראל"}
                  onChange={handleOfficeInputChange}
                  placeholder="מדינה"
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="input-group">
                <span className="input-group-text">
                  <BsFillSignpostFill />
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  value={office.city || ""}
                  onChange={handleOfficeInputChange}
                  required
                  placeholder="עיר"
                  ref={cityRef}
                />
                <div className="invalid-feedback">יש להכניס שם עיר.</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="input-group">
                <span className="input-group-text">
                  <BsBuildingsFill />
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  value={office.address || ""}
                  onChange={handleOfficeInputChange}
                  placeholder="כתובת"
                  ref={addressRef}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="input-group">
                <span className="input-group-text">
                  <BsBuildingsFill />
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="zip"
                  value={office.zip || ""}
                  onChange={handleOfficeInputChange}
                  placeholder="מיקוד"
                  ref={zipRef}
                />
              </div>
            </div>
          </div>
          <div className="row  pb-3">
            <div className="col-md-3">
              <div className="input-group">
                <span className="input-group-text">
                  <BsFillTelephoneFill />
                </span>
                <select
                  className="form-select"
                  id="type"
                  value={officePhone.type}
                  onChange={handleOfficePhoneChange}
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
            <div className="col-md-3">
              <div className="input-group">
                <span className="input-group-text">
                  <BsFillTelephoneFill />
                </span>
                <input
                  type="text"
                  className="form-control text-end"
                  id="num"
                  value={officePhone.num}
                  onChange={handleOfficePhoneChange}
                  placeholder="טלפון"
                  ref={phoneRef}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="input-group">
                <span className="input-group-text">
                  <BsFillJournalBookmarkFill />
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="note"
                  value={officePhone.note}
                  onChange={handleOfficePhoneChange}
                  placeholder="הערה לטלפון"
                />
              </div>
            </div>
            <div className="col-md-3 d-flex">
              <div className="col-md-1">
                <button
                  type="button"
                  id="addPhone"
                  className="btn btn-success "
                  onClick={handleOfficeAddPhone}
                >
                  +
                </button>
              </div>
              <div className="col-md-11 ">
                <table className="table table-striped  w-100 ms-2">
                  <thead>
                    <tr>
                      <th scope="col" className="py-0">
                        #
                      </th>
                      <th scope="col" className="py-0">
                        טלפון
                      </th>
                      <th scope="col" className="py-0 text-center">
                        מחק
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {office.phones.map((officePhone, index) => (
                      <tr key={officePhone.id}>
                        <th scope="row" className="py-0">
                          {index + 1}
                        </th>
                        <td className="py-0">{officePhone.num}</td>
                        <td className="py-0 text-center">
                          <span
                            className="text-danger pe-2"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleOfficeDeletePhone(officePhone.id)
                            }
                          >
                            <BsFillTrash3Fill />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </form>
        <div className="registration-login-buttons">
          <button type="button" className="btn btn-dark" onClick={handleCancel}>
            ביטול
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={ValidateForm}
          >
            הגדרת מנהל ראשי
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterOffice;
