import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserMenu() {
  const [user, setUser] = useState();

  useEffect(() => {
    var user_data = localStorage.getItem("user_data");
    setUser(JSON.parse(user_data));
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user_data");
    window.location.reload(false);
  };

  return (
    <li className="nav-item dropdown ms-lg-3">
      <Link
        className="nav-link dropdown-toggle pt-1 px-0"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <div className="media d-flex align-items-center">
          <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
            <span className="mb-0 font-small fw-bold text-gray-900">
              {user ? user.name + " " + user.lastname : ""}
            </span>
          </div>
        </div>
      </Link>
      <div className="dropdown-menu dashboard-dropdown dropdown-menu-end mt-2 py-1">
        <Link className="dropdown-item d-flex align-items-center" to="#">
          <svg
            className="dropdown-icon text-gray-400 me-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clipRule="evenodd"
            ></path>
          </svg>
          My Profile
        </Link>
        <Link className="dropdown-item d-flex align-items-center" to="#">
          <svg
            className="dropdown-icon text-gray-400 me-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            ></path>
          </svg>
          Settings
        </Link>
        {
          //         <Link className="dropdown-item d-flex align-items-center" to="#">
          //           <svg
          //             className="dropdown-icon text-gray-400 me-2"
          //             fill="currentColor"
          //             viewBox="0 0 20 20"
          //             xmlns="http://www.w3.org/2000/svg"
          //           >
          //             <path
          //               fillRule="evenodd"
          //               d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z"
          //               clipRule="evenodd"
          //             ></path>
          //           </svg>
          //           Messages
          //         </Link>
          //
        }
        <Link className="dropdown-item d-flex align-items-center" to="#">
          <svg
            className="dropdown-icon text-gray-400 me-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
              clipRule="evenodd"
            ></path>
          </svg>
          Support
        </Link>
        <div role="separator" className="dropdown-divider my-1"></div>
        <Link
          className="dropdown-item d-flex align-items-center"
          onClick={handleSignOut}
        >
          <svg
            className="dropdown-icon text-danger me-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            ></path>
          </svg>
          Logout
        </Link>
      </div>
    </li>
  );
}
