import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import i18next from "i18next";

export default function ShortMenu() {
  const [roleType, setRoleType] = useState("");

  useEffect(() => {
    var role = localStorage.getItem("userRole");
    setRoleType(role);
  });

  return roleType === "ADMIN" ? (
    <nav className="navbar navbar-dark navbar-theme-primary px-4 col-12 d-lg-none">
      <Link className="navbar-brand me-lg-5" to="/">
        <img
          className="navbar-brand-dark"
          src="./assets/img/brand/light.svg"
          alt={i18next.t('general.project')}
        />
        <img
          className="navbar-brand-light"
          src="./assets/img/brand/dark.svg"
          alt={i18next.t('general.project')}
        />
      </Link>
      <div className="d-flex align-items-center">
        <button
          className="navbar-toggler d-lg-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  ) : null;
}
