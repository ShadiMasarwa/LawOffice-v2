import axios from "axios";
import { useEffect } from "react";

export const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);

  const formattedDate = date
    .toLocaleDateString("en-GB")
    .split("/")
    .map((part) => part.padStart(2, "0"))
    .join("/");

  const formattedTime = date.toLocaleTimeString("he-IL", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${formattedDate}, ${formattedTime}`;
};

export const getUserName = async (userId) => {
  if (userId) {
    try {
      const response = await axios.get(
        `http://localhost:3500/api/office/username/${userId}`
      );
      return response.data;
    } catch (err) {
      console.error("Error fetching user name:", err);
      return "";
    }
  }
};
