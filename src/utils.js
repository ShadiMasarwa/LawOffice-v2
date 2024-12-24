export const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);

  const formattedDate = date
    .toLocaleDateString("he-IL")
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
