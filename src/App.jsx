import { useState } from "react";
import "./App.css";
import GlobalContext from "./Hooks/GlobalContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddPerson from "./pages/AddPerson";
import Customers from "./pages/Customers";
import Customer from "./pages/Customer";
import Files from "./pages/Files";
import Manage from "./pages/Manage";
import Calendar from "./pages/Calendar";
import Footer from "./components/Footer";
import Tasks from "./pages/Tasks";

function App() {
  const [toastAttributes, setToastAttributes] = useState({
    visible: false,
    resut: false,
    body: "",
  });
  const [GclientId, SetGClientId] = useState();
  const [user, setUser] = useState({ name: "שאדי מצארוה" });
  const [office, setOffice] = useState({ name: "משרד שאדי מצארוה ושותפיו" });

  return (
    <>
      <GlobalContext.Provider
        value={{
          toastAttributes,
          setToastAttributes,
          GclientId,
          SetGClientId,
          user,
          office,
        }}
      >
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addClient" element={<AddPerson />} />
            <Route path="/showClients" element={<Customers />} />
            <Route path="/client" element={<Customer />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/showfiles" element={<Files />} />
            <Route path="/manage" element={<Manage />} />
            <Route path="/showClient" element={<Customer />} />
            <Route path="/tasks" element={<Tasks />} />
          </Routes>
          {/* <Footer /> */}
        </BrowserRouter>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
