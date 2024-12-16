import React, {useContext} from "react";

import {AppContext} from "../../context/AppContextProvider";
import {UserContext} from "../../context/UserContextProvider";
import {useNavigate} from "react-router";
import TokenService from "../../service/token.service";
import {Link} from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const appContext = useContext(AppContext);
    const {setAppState} = appContext;
    const userContext = useContext(UserContext);
    const {userInformation, auth} = userContext;

    let path = window.location.pathname;

    return (


        <React.Fragment>
            <nav className="navbar navbar-top navbar-expand navbar-dashboard bg-dark pb-0 pt-0 mb-2 mt-3">
                <div className="container-fluid px-0">
                    <div
                        className="d-flex justify-content-between w-100 p-0"
                        id="navbarSupportedContent"
                    >
                        <div className="d-flex align-items-center">
                            <div className="text-white m-2 m-lg-0 px-3">Doküman Yönetim Sistemi</div>
                        </div>
                        <ul className="navbar-nav align-items-center">
                            <div className="m-2 text-white">
                                {userInformation ? (
                                    <span className="mx-4 ">
                    {userInformation.name + " - " + userInformation.unit}
                  </span>
                                ) : (
                                    ""
                                )}
                                <button
                                    className="btn btn-danger text-light "
                                    onClick={() => {
                                        navigate("/");
                                        TokenService.removeUser();
                                        setAppState("LOGIN_REQUIRED");
                                    }}
                                >
                                    Çıkış
                                </button>
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>
            <nav className="navbar navbar-top navbar-expand navbar-dashboard bg-body pb-0 pt-0 mb-2 mt-1">
                <div className="container-fluid px-0">
                    <div
                        className="d-flex justify-content-between w-100 p-0"
                        id="navbarSupportedContent"
                    >

                        <div className="d-flex align-items-center">
                            {
                                // <Link to="/" className={`btn ${path === "/" ? "btn-danger" : "btn-success"} m-2 m-lg-0`}>Evraklarım</Link>
                            }

                            {
                                auth && auth.fileSearch ?
                                    <Link to="/search"
                                          className={`btn ${path === "/search" ? "btn-danger" : "border-2 text-dark bg-white btn-success"} m-2`}>Evrak
                                        Arama</Link>
                                    : null
                            }
                            {
                                auth && auth.scan ?
                                    <Link to="/document-scan"
                                          className={`btn ${path === "/document-scan" ? "btn-danger" : "border-2 text-dark bg-white btn-info"} m-2`}>Evrak
                                        Tarama</Link>
                                    : null
                            }
                            {
                                auth && auth.archive ?
                                    <Link to="/archive"
                                          className={`btn ${path === "/archive" ? "btn-danger" : "border-2 text-dark bg-white btn-info"} m-2`}>Arşiv</Link>

                                    : null
                            }
                            {
                                auth && auth.admin ?
                                    <Link to="/admin"
                                          className={`btn ${path === "/admin" ? "btn-danger" : "border-2 text-dark bg-white btn-info"} m-2`}>Yönetim</Link>
                                    : null
                            }
                            {
                                //<Link to="/change-password" className={`btn ${path === "/change-password" ? "btn-danger" : "btn-info"} m-2`}>Şifre Değiştirme</Link>
                            }

                            <Link to="/projects"
                                  className={`btn ${path === "/projects" ? "btn-danger" : "border-2 text-dark bg-white btn-info"} m-2`}>Projeler
                            </Link>
                            {
                                //<Link to="/text" className={`btn ${path === "/text" ? "btn-danger" : "btn-info"} m-2`}>Yazılar</Link>
                            }
                        </div>

                    </div>
                </div>
            </nav>
        </React.Fragment>
    );
}
