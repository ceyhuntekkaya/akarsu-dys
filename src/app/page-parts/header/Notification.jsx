import React from "react";
import { Link } from "react-router-dom";

export default function Notification() {
  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link text-dark notification-bell unread dropdown-toggle"
        data-unread-notifications="true"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        data-bs-display="static"
        aria-expanded="false"
      >
        <svg
          className="icon icon-sm text-gray-900"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
        </svg>
      </a>
      <div className="dropdown-menu dropdown-menu-lg dropdown-menu-center mt-2 py-0">
        <div className="list-group list-group-flush">
          <a
            href="#"
            className="text-center text-primary fw-bold border-bottom border-light py-3"
          >
            Notifications
          </a>
          <Link
            to="/"
            className="list-group-item list-group-item-action border-bottom"
          >
            <div className="row align-items-center">
 
              <div className="col ps-0 ms-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h4 className="h6 mb-0 text-small">Anomali var...</h4>
                  </div>
                  <div className="text-end">
                    <small className="text-danger">a few moments ago</small>
                  </div>
                </div>
                <p className="font-small mt-1 mb-0">
                  12 nolu node 4 anomali gönderdi. Kontrol eder misiniz?
                </p>
              </div>
            </div>
          </Link>
     
        </div>
      </div>
    </li>
  );
}
