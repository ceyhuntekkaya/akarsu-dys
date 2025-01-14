import React from "react";
import { Link } from "react-router-dom";
import i18next from "i18next";

export default function Footer() {
  return (
    <footer className="bg-white rounded shadow px-5 py-4 mt-4">
      <div className="row">
        <div className="col-12 col-md-4 col-xl-6 mb-4 mb-md-0">
          <p className="mb-0 text-center text-lg-start">
            © 2024-<span className="current-year"></span>
            <Link className="text-primary fw-normal" to="#" target="_blank">
              {i18next.t('general.project')}
            </Link>
          </p>
        </div>
        <div className="col-12 col-md-8 col-xl-6 text-center text-lg-start">
          <ul className="list-inline list-group-flush list-group-borderless text-md-end mb-0">
            <li className="list-inline-item px-0 px-sm-2">
              <Link href="#"> {i18next.t('general.project')}</Link>
            </li>
            {/* <li className="list-inline-item px-0 px-sm-2">
              <Link to="#">Education</Link>
            </li>
            <li className="list-inline-item px-0 px-sm-2">
              <Link to="#">Documentation</Link>
            </li>
            <li className="list-inline-item px-0 px-sm-2">
              <Link to="#">Contact</Link>
            </li> */}
          </ul>
        </div>
      </div>
    </footer>
  );
}
