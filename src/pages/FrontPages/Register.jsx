import React, { useState, useContext } from "react";
import RegisterOffice from "./RegisterOffice";
import RegisterUser from "./RegisterUser";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../Hooks/GlobalContext";

const Register = () => {
  const [page, setPage] = useState(1);
  const [office, setOffice] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { ShowToast } = useContext(GlobalContext);

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3500/api/office/register", {
        office,
        user,
      });
      ShowToast(true, "משתמש נרשם בהצלחה");
      navigate("/login");
    } catch (error) {
      ShowToast(false, "שגיאה בהרשמה");
    }
  };

  return (
    <>
      {page === 1 ? (
        <RegisterOffice
          setPage={setPage}
          office={office}
          setOffice={setOffice}
        />
      ) : (
        <RegisterUser
          setPage={setPage}
          user={user}
          setUser={setUser}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default Register;
