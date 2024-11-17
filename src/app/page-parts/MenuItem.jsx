import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function MenuItem(props) {
  let location = useLocation();
  return (
    <li className={`nav-item ${location.pathname === props.path ? "active" : ""}`}>
      <Link
        to={props.path}
        className="nav-link d-flex align-items-center justify-content-between"
      >
        <span>
          {<props.icon />}
          <span className="sidebar-text"> proje</span>
        </span>
        {props.count ? (
          <span className="badge badge-sm bg-danger badge-pill notification-count">
            4
          </span>
        ) : null}
      </Link>
    </li>
  );
}
