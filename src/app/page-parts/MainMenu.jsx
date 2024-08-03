import React, { useState, useEffect } from "react";
import MenuItem from "./MenuItem";
import { adminRoutes } from "../../config/route";
import { Link, Navigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import i18next from "i18next";

export default function MainMenu() {
  let location = useLocation();
  const [visibility, setVisibility] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [currentRole, setCurrentRole] = useState("ADMIN");
  const [roleType, setRoleType] = useState("");

  useEffect(() => {
    var role = "ADMIN";
    setRoleType(role);
  });

  useEffect(() => {
    if (localStorage.getItem("user_data")) {
      setCurrentRole(JSON.parse(localStorage.getItem("user_data")).role);
    }
  }, []);

  useEffect(() => {
    if (location.pathname === "/sing-in") {
      setVisibility(false);
    } else {
      setVisibility(true);
    }
  }, [location]);

  return roleType === "ADMIN" ? (
    <React.Fragment>
      {visibility === true ? (
        <nav
          id="sidebarMenu"
          className="sidebar d-lg-block bg-gray-800 text-white collapse"
          data-simplebar
        >
          <div className="sidebar-inner px-4 pt-3">
            <ul className="nav flex-column pt-3 pt-md-0">
              <li className="nav-item mb-3">
                <Link to="/" className="nav-link d-flex align-items-center">
                  <span className="sidebar-icon">
                    <img src={logo} height="20" width="20" alt={i18next.t('general.project')} />
                  </span>
                  <span className="mt-1 sidebar-text"> {i18next.t('general.project')}</span>
                </Link>
              </li>
              {currentRole
                ? adminRoutes.map((route, key) =>
                    route.sidePanelVisible === true ? (
                      <MenuItem
                        key={key}
                        icon={route.icon}
                        name={route.name}
                        path={route.path}
                      />
                    ) : null
                  )
                : null}
              <li
                role="separator"
                className="dropdown-divider mt-4 mb-3 border-gray-700"
              ></li>

              <li className="nav-item">
                <Link
                  to="#"
                  target="_blank"
                  className="nav-link d-flex align-items-center"
                >
                  <span className="sidebar-icon">
                    <svg
                      className="icon icon-xs me-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  <span className="sidebar-text">Destek</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="#"
                  target="_blank"
                  className="nav-link d-flex align-items-center"
                >
                  <span className="sidebar-icon">
                    <img
                      src="../../assets/img/themesberg.svg"
                      height="20"
                      width="28"
                      alt="Themesberg Logo"
                    />
                  </span>
                  <span className="sidebar-text">{i18next.t('general.project')}</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      ) : null}
      {isLogin === false ? <Navigate to="/sing-in" /> : null}
    </React.Fragment>
  ) : null;
}
