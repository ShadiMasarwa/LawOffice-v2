import { useContext } from "react";
import GlobalContext from "../Hooks/GlobalContext";

import React from "react";

const Toast = () => {
  const { setToastVisible, toastResult, toastMessage } =
    useContext(GlobalContext);
  return (
    <div
      className="toast show position-fixed bottom-0 end-0 m-3"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{ zIndex: 1055 }}
    >
      <div
        className={`toast-header ${
          toastResult ? "bg-success" : "bg-danger"
        } text-white`}
      >
        <strong className="me-auto">הודעת מערכת</strong>
        <button
          type="button"
          className="btn-close"
          onClick={() => setToastVisible(false)}
          aria-label="Close"
        ></button>
      </div>
      <div className="toast-body fw-bold">{toastMessage}</div>
    </div>
  );
};

export default Toast;
