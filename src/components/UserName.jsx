import React, { useEffect, useState } from "react";
import axios from "axios";

const UserName = ({ userId }) => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:3500/api/office/username/${userId}`
          );
          setUserName(response.data);
        } catch (err) {
          console.error("Error fetching user name:", err);
          setUserName(""); // Fallback to empty string on error
        }
      }
    };

    fetchUserName();
  }, [userId]);
  return <>{userName}</>;
};

export default UserName;
