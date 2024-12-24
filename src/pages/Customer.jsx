import React, { useState, useEffect, useContext, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import GlobalContext from "../Hooks/GlobalContext";
import {
  BsBuildingsFill,
  BsCalendar2WeekFill,
  BsEnvelopeAtFill,
  BsFillJournalBookmarkFill,
  BsFillPersonVcardFill,
  BsFillSignpostFill,
  BsFillTelephoneFill,
  BsFillTrashFill,
  BsGenderTrans,
  BsPersonFill,
  BsPersonWorkspace,
  BsSignpost2Fill,
} from "react-icons/bs";

const Customer = () => {
  const { ShowToast, userDetails, officeDetails } = useContext(GlobalContext);

  const location = useLocation();
  const [customer, setCustomer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ phones: [] });
  const [phone, setPhone] = useState({ type: 1, num: "", note: "" });

  const nameRef = useRef(null);
  const phoneRef = useRef(null);

  useEffect(() => {
    if (location.state?.customer) {
      setCustomer(location.state.customer);
      setFormData(location.state.customer);
    }
  }, [location.state?.customer]);

  const handlePhoneChange = (e) => {
    const { id, value } = e.target;
    setPhone((prevPhone) => ({
      ...prevPhone,
      [id]: value,
    }));
  };

  const handleAddPhone = () => {
    if (phone.num.trim()) {
      setFormData((prevClient) => ({
        ...prevClient,
        phones: [...prevClient.phones, { ...phone, id: Date.now() }],
      }));
      setPhone({ type: 1, num: "", note: "" });
    } else {
      phoneRef.current.focus();
      ShowToast(0, "לא הוכנס מספר טלפון");
    }
  };

  const handleDeletePhone = (id) => {
    setFormData((prevClient) => ({
      ...prevClient,
      phones: prevClient.phones.filter((phone) => phone._id !== id),
    }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = async () => {
    if (!formData.fname.trim()) {
      ShowToast(0, "שם פרטי לא יכול להיות ריק");
      nameRef.current.focus();
      return;
    }

    try {
      console.log("customer._id", customer._id);
      await axios.put(
        `http://localhost:3500/api/clients/updateclient/${formData._id}`,
        {
          formData,
          userDetails: { _id: userDetails._id },
          officeDetails: { _id: officeDetails._id },
        }
      );
      setCustomer(formData);
      setIsEditing(false);
      ShowToast(1, "השינויים נשמרו בהצלחה");
    } catch (err) {
      ShowToast(0, "שגיאה בשמירת עדכונים");
    }
  };

  const handleCancel = () => {
    setFormData(customer);
    setIsEditing(false);
  };

  return (
    <div className="container">
      <h2 className="text-primary">עדכון אנשים </h2>
      <form className="row g-3 needs-validation" noValidate>
        <div className="col-md-3">
          <div className="input-group has-validation">
            <span className="input-group-text">
              <BsPersonFill />
            </span>

            <input
              type="text"
              className="form-control"
              id="fname"
              value={formData.fname || ""}
              onChange={handleInputChange}
              placeholder="שם פרטי/חברה"
              required
              disabled={!isEditing}
              ref={nameRef}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="input-group has-validation">
            <span className="input-group-text">
              <BsPersonFill />
            </span>
            <input
              type="text"
              className="form-control"
              id="mname"
              value={formData.mname || ""}
              onChange={handleInputChange}
              placeholder="שם אב"
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="input-group has-validation">
            <span className="input-group-text">
              <BsPersonFill />
            </span>
            <input
              type="text"
              className="form-control"
              id="lname"
              value={formData.lname || ""}
              onChange={handleInputChange}
              placeholder="שם משפחה"
              disabled={!isEditing}
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
              value={formData.gender || 1}
              onChange={handleInputChange}
              disabled={!isEditing}
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
          <div className="input-group has-validation">
            <span className="input-group-text">
              <BsFillPersonVcardFill />
            </span>
            <select
              className="form-select"
              id="idType"
              value={formData.idType || 1}
              onChange={handleInputChange}
              disabled={!isEditing}
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
          <div className="input-group has-validation">
            <span className="input-group-text">
              <BsFillPersonVcardFill />
            </span>
            <input
              type="text"
              className="form-control"
              id="id"
              value={formData.id || ""}
              onChange={handleInputChange}
              placeholder="מספר זיהוי"
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="input-group has-validation">
            <span className="input-group-text">
              <BsPersonWorkspace />
            </span>
            <input
              type="text"
              className="form-control"
              id="occupation"
              value={formData.occupation || ""}
              onChange={handleInputChange}
              placeholder="מקצוע"
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="input-group has-validation">
            <span className="input-group-text">
              <BsPersonWorkspace />
            </span>
            <input
              type="text"
              className="form-control"
              id="workat"
              value={formData.workat || ""}
              onChange={handleInputChange}
              placeholder="מקום עבודה"
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="input-group has-validation">
            <span className="input-group-text">
              <BsSignpost2Fill />
            </span>
            <input
              type="text"
              className="form-control"
              id="state"
              value={formData.state || ""}
              onChange={handleInputChange}
              placeholder="מדינה"
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="input-group has-validation">
            <span className="input-group-text">
              <BsFillSignpostFill />
            </span>
            <input
              type="text"
              className="form-control"
              id="city"
              value={formData.city || ""}
              onChange={handleInputChange}
              required
              placeholder="עיר"
              disabled={!isEditing}
            />
            <div className="invalid-feedback">יש להכניס שם עיר.</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="input-group has-validation">
            <span className="input-group-text">
              <BsBuildingsFill />
            </span>
            <input
              type="text"
              className="form-control"
              id="address"
              value={formData.address || ""}
              onChange={handleInputChange}
              placeholder="כתובת"
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="input-group has-validation">
            <span className="input-group-text">
              <BsBuildingsFill />
            </span>
            <input
              type="text"
              className="form-control"
              id="zip"
              value={formData.zip || ""}
              onChange={handleInputChange}
              placeholder="מיקוד"
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="col-md-3">
          <div className="input-group has-validation">
            <span className="input-group-text">
              <BsEnvelopeAtFill />
            </span>
            <input
              type="email"
              className="form-control text-end"
              id="email"
              value={formData.email || ""}
              onChange={handleInputChange}
              placeholder="דואר אלקטרוני"
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="col-md-2">
          <div className="input-group has-validation">
            <span className="input-group-text">
              <BsFillTelephoneFill />
            </span>
            <select
              className="form-select"
              id="type"
              value={phone.type}
              onChange={handlePhoneChange}
              disabled={!isEditing}
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
          <div className="input-group has-validation">
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
              disabled={!isEditing}
              ref={phoneRef}
            />
          </div>
        </div>
        <div className="col-md-2">
          <div className="input-group has-validation">
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
              disabled={!isEditing}
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
              disabled={!isEditing}
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
                {formData.phones.map((phone, index) => (
                  <tr key={phone._id || phone.id}>
                    <th scope="row" className="py-0">
                      {index + 1}
                    </th>
                    <td className="py-0">{phone.num}</td>
                    <td className="py-0">
                      {isEditing && (
                        <span
                          className="text-danger"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handleDeletePhone(phone._id || phone.id)
                          }
                        >
                          <BsFillTrashFill />
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-12 ">
          <div className="input-group has-validation">
            <span className="input-group-text">
              <BsFillJournalBookmarkFill />
            </span>
            <textarea
              className="form-control"
              id="notes"
              value={formData.notes || ""}
              onChange={handleInputChange}
              rows="3"
              placeholder="הערות"
              disabled={!isEditing}
            ></textarea>
          </div>
        </div>
        <div className="text-primary col-md-1 ms-3">פרטי הוספה:</div>
        <div className="col-md-3">
          <div className="input-group has-validation">
            <span className="input-group-text">
              <BsCalendar2WeekFill />
            </span>
            <input
              type="text"
              className="form-control"
              id="add_date"
              placeholder="תאריך הוספה"
              value={formData.addDate || ""}
              disabled
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="input-group has-validation">
            <span className="input-group-text">
              <BsPersonFill />
            </span>
            <input
              type="text"
              className="form-control"
              id="add_user"
              placeholder="נוסף על ידי"
              value={formData.addedBy || ""}
              disabled
            />
          </div>
        </div>
        {formData.updateDate && formData.updateBy && (
          <>
            <div className="text-primary col-md-1">פרטי עדכון:</div>
            <div className="col-md-3">
              <div className="input-group has-validation">
                <span className="input-group-text">
                  <BsCalendar2WeekFill />
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="add_date"
                  placeholder="תאריך עדכון"
                  value={formData.updateDate || ""}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="input-group has-validation">
                <span className="input-group-text">
                  <BsPersonFill />
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="add_user"
                  placeholder="עודכן על ידי"
                  value={formData.updateBy || ""}
                  disabled
                />
              </div>
            </div>
          </>
        )}

        <div className="col-12 text-end">
          {isEditing ? (
            <>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleSave}
              >
                שמירה
              </button>
              <button
                type="button"
                className="btn btn-danger ms-2"
                onClick={handleCancel}
              >
                ביטול
              </button>
            </>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setIsEditing(true)}
            >
              עדכון
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

{
  /* <div className="col-md-12 d-flex justify-content-center gap-3 mt-4">
  
</div>; */
}
export default Customer;
