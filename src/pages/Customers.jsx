import { useState, useEffect, useContext } from "react";
import axios from "axios";
import GlobalContext from "../Hooks/GlobalContext";
import { Link } from "react-router-dom";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { formatDateTime } from "../utils.js";
import UserName from "../components/UserName";

const genderMap = {
  1: "נקבה",
  2: "זכר",
  3: "אחר",
};

const idTypeMap = {
  1: "ת.ז.",
  2: "חברה",
  3: "דרכון",
};

const phoneTypeMap = {
  1: "נייד",
  2: "בית",
  3: "פקס בית",
  4: "טלפון עבודה",
  5: "פקס עבודה",
  6: "אחר",
};

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("noSort");
  const [expandedCards, setExpandedCards] = useState({});
  const [displayCards, setDisplayCards] = useState(true);
  const { ShowToast, officeDetails } = useContext(GlobalContext);

  useEffect(() => {
    const fetchCustomers = async () => {
      console.log(officeDetails);
      if (!officeDetails._id) {
        ShowToast(false, "מזהה משרד חסר");
        return;
      }
      const officeId = officeDetails._id;
      try {
        const response = await axios.post(
          "http://localhost:3500/api/clients",
          { officeId },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setCustomers(response.data.clients);
      } catch (err) {
        ShowToast(false, "שגיאה בטעינת הלקוחות");
      }
    };

    fetchCustomers();
  }, [officeDetails._id]);

  const toggleCard = (id) => {
    setExpandedCards((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const filteredCustomers = customers.filter((customer) => {
    const searchValue = searchTerm.trim().toLowerCase();
    const fullName = [
      customer.fname || "",
      customer.mname || "",
      customer.lname || "",
    ]
      .join(" ")
      .toLowerCase()
      .trim();

    const phoneNumbers = (customer.phones || [])
      .map((phone) => phone.num.replace(/\D/g, ""))
      .join(" ");

    return (
      fullName.includes(searchValue) ||
      (customer.id && customer.id.toLowerCase().includes(searchValue)) ||
      phoneNumbers.includes(searchValue) ||
      customer.city.includes(searchValue) ||
      customer.address.includes(searchValue) ||
      customer.state.includes(searchValue) ||
      customer.zip.includes(searchValue) ||
      customer.notes.includes(searchValue) ||
      customer.occupation.includes(searchValue) ||
      customer.workat.includes(searchValue) ||
      customer.addedBy.includes(searchValue)
    );
  });

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    if (sortOrder === "a-z") {
      return a.fname.localeCompare(b.fname);
    } else if (sortOrder === "z-a") {
      return b.fname.localeCompare(a.fname);
    }
    return 0;
  });

  return (
    <div className="container">
      <h2 className="text-primary">הצגת אנשים</h2>
      <div className="row mb-4">
        <div className="col-md-2 d-grid">
          <Link className="btn btn-outline-success" to="/addClient">
            <span className="m-0 mt-1">
              <BsFillPersonPlusFill />
              <span className="m-0 ps-1">הוספה</span>
            </span>
          </Link>
        </div>
        <div className="col-md-2 d-grid">
          <Link
            className="btn btn-outline-dark"
            onClick={() => setDisplayCards(!displayCards)}
          >
            {displayCards ? "תצוגת כרטיסים" : "תצוגת רשימה"}
          </Link>
        </div>
        <div className="col-md-4 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="חיפוש"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="noSort">ללא מיון</option>
            <option value="a-z">א-ת</option>
            <option value="z-a">ת-א</option>
          </select>
        </div>
      </div>
      {displayCards ? (
        <div className="row">
          {sortedCustomers.map((customer) => (
            <div className="col-md-3 mb-3" key={customer._id}>
              <table className="table table-striped table-secondary table-borderless rounded shadow">
                <thead>
                  <tr>
                    <th colSpan="2" className="bg-primary rounded-top">
                      <h5 className="fw-bold text-white mb-0">
                        <Link
                          to="/client"
                          state={{ customer }}
                          className="text-white text-decoration-none"
                        >
                          {customer.fname} {customer.mname} {customer.lname}
                        </Link>
                      </h5>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {customer.gender && (
                    <tr>
                      <td className="fw-bold">מין:</td>
                      <td className="text-primary">
                        {genderMap[customer.gender]}
                      </td>
                    </tr>
                  )}
                  {customer.idType && (
                    <tr>
                      <td className="fw-bold">סוג מזהה:</td>
                      <td className="text-primary">
                        {idTypeMap[customer.idType]}
                      </td>
                    </tr>
                  )}
                  {customer.id && (
                    <tr>
                      <td className="fw-bold">מספר מזהה:</td>
                      <td className="text-primary">{customer.id}</td>
                    </tr>
                  )}

                  <tr>
                    <td colSpan="2" className="text-center">
                      <button
                        className="btn btn-link text-decoration-none"
                        onClick={() => toggleCard(customer._id)}
                      >
                        {expandedCards[customer._id] ? "▲" : "▼"}
                      </button>
                    </td>
                  </tr>

                  {expandedCards[customer._id] && (
                    <>
                      {customer.occupation && (
                        <tr>
                          <td className="fw-bold">מקצוע:</td>
                          <td className="text-primary">
                            {customer.occupation}
                          </td>
                        </tr>
                      )}
                      {customer.workat && (
                        <tr>
                          <td className="fw-bold">עובד ב:</td>
                          <td className="text-primary">{customer.workat}</td>
                        </tr>
                      )}
                      {customer.address && (
                        <tr>
                          <td className="fw-bold">כתובת:</td>
                          <td className="text-primary">{customer.address}</td>
                        </tr>
                      )}
                      {customer.city && (
                        <tr>
                          <td className="fw-bold">עיר:</td>
                          <td className="text-primary">{customer.city}</td>
                        </tr>
                      )}
                      {customer.state && (
                        <tr>
                          <td className="fw-bold">מדינה:</td>
                          <td className="text-primary">{customer.state}</td>
                        </tr>
                      )}
                      {customer.zip && (
                        <tr>
                          <td className="fw-bold">מיקוד:</td>
                          <td className="text-primary">{customer.zip}</td>
                        </tr>
                      )}
                      {customer.email && (
                        <tr>
                          <td className="fw-bold">אימייל:</td>
                          <td className="text-primary">{customer.email}</td>
                        </tr>
                      )}
                      {customer.phones && customer.phones.length > 0 && (
                        <>
                          <tr>
                            <td colSpan="2" className="fw-bold">
                              טלפונים:
                            </td>
                          </tr>
                          {customer.phones.map((phone, index) => (
                            <tr key={index}>
                              <td className="fw-bold">
                                {phoneTypeMap[phone.type]}:
                              </td>
                              <td className="text-primary">
                                {phone.num}
                                {phone.note && <span> ({phone.note})</span>}
                              </td>
                            </tr>
                          ))}
                        </>
                      )}
                      {customer.notes && (
                        <tr>
                          <td className="fw-bold">הערות:</td>
                          <td className="text-primary">{customer.notes}</td>
                        </tr>
                      )}
                      {customer.addedBy && customer.addDate && (
                        <tr>
                          <td className="fw-bold">נוסף על ידי:</td>
                          <td className="text-primary">
                            <UserName userId={customer.addedBy} /> <br />
                            ב: {formatDateTime(customer.addDate)}
                          </td>
                        </tr>
                      )}
                      {customer.updateBy && customer.updateDate && (
                        <tr>
                          <td className="fw-bold">עדכון אחרון:</td>
                          <td className="text-primary">
                            <UserName userId={customer.updateBy} /> <br />
                            ב: {formatDateTime(customer.updateDate)}
                          </td>
                        </tr>
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ) : (
        <table className="table table-striped table-secondary table-borderless rounded shadow">
          <thead>
            <tr>
              <th>
                <h5 className="fw-bold text-primary mb-0"> שם</h5>
              </th>
              <th>
                <h5 className="fw-bold text-primary mb-0"> ת.ז./ח.פ.</h5>
              </th>
              <th>
                <h5 className="fw-bold text-primary mb-0"> מגדר</h5>
              </th>
              <th>
                <h5 className="fw-bold text-primary mb-0"> עיר</h5>
              </th>
              <th>
                <h5 className="fw-bold text-primary mb-0"> דוא"ל</h5>
              </th>
              <th>
                <h5 className="fw-bold text-primary mb-0"> טלפונים</h5>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedCustomers.map((customer) => (
              <tr key={customer._id}>
                <td className="align-middle">
                  <Link
                    to="/client"
                    state={{ customer }}
                    className="text-dark fw-bold text-decoration-none"
                  >
                    {customer.fname} {customer.mname} {customer.lname}
                  </Link>
                </td>
                <td className="align-middle">{customer.id}</td>
                <td className="align-middle">{genderMap[customer.gender]}</td>
                <td className="align-middle">{customer.city}</td>
                <td className="align-middle">{customer.email}</td>
                <td className="align-middle">
                  {customer.phones.map((phone) => (
                    <p className="p-0 m-0" key={phone._id}>
                      <i className="text-primary fw-bold">
                        {phoneTypeMap[phone.type]}:
                      </i>{" "}
                      {phone.num}
                    </p>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Customers;
