import { useState } from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import GlobalContext from "./Hooks/GlobalContext";
import Toast from "./components/Toast";
import MainRouters from "./Routers/MainRoters";

function App() {
  const [toastAttributes, setToastAttributes] = useState({
    visible: false,
    result: false,
    body: "",
  });
  const [userDetails, setUserDetails] = useState(null);
  const [officeDetails, setOfficeDetails] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const ShowToast = (result, message) => {
    setToastAttributes({ visible: true, result, body: message });

    setTimeout(() => {
      setToastAttributes({ visible: false, result: false, body: "" });
    }, 3000);
  };

  return (
    <GlobalContext.Provider
      value={{
        toastAttributes,
        setToastAttributes,
        ShowToast,
        userDetails,
        officeDetails,
        setUserDetails,
        setOfficeDetails,
        accessToken,
        setAccessToken,
      }}
    >
      <Toast />
      <RouterProvider router={MainRouters} />
    </GlobalContext.Provider>
  );
}

export default App;
