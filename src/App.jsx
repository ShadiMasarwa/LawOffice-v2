import { useState } from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";

import GlobalContext from "./Hooks/GlobalContext";
import FPRouters from "./Routers/FPRouters";
import MainRouters from "./Routers/MainRoters";

function App() {
  const [toastAttributes, setToastAttributes] = useState({
    visible: false,
    resut: false,
    body: "",
  });
  const [GclientId, SetGClientId] = useState();
  const [userDetails, setUserDetails] = useState(null);
  const [officeDetails, setOfficeDetails] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  return (
    <>
      <GlobalContext.Provider
        value={{
          toastAttributes,
          setToastAttributes,
          GclientId,
          SetGClientId,
          userDetails,
          officeDetails,
          setUserDetails,
          setOfficeDetails,
          accessToken,
          setAccessToken,
        }}
      >
        {userDetails && officeDetails ? (
          <RouterProvider router={MainRouters} />
        ) : (
          <RouterProvider router={FPRouters} />
        )}
      </GlobalContext.Provider>
    </>
  );
}

export default App;
