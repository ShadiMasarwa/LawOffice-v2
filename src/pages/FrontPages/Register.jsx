import React, { useState } from "react";
import RegisterOffice from "./RegisterOffice";
import RegisterUser from "./RegisterUser";
import axios from "axios";

const Register = () => {
  const [page, setPage] = useState(1);
  const [office, setOffice] = useState(null);
  const [user, setUser] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3500/api/office/register",
        {
          office,
          user,
        }
      );

      console.log("Data submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
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
