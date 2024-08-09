import React, {useContext, useEffect} from "react";
import {AppContext} from "./context/AppContextProvider";
import {Route, Routes} from "react-router";
import {adminRoutes, loginRoutes} from "./config/route";
import NoMatch from "./app/general/NoMatch";
import {UserContext} from "./context/UserContextProvider";
import {BrowserRouter} from "react-router-dom";
import Header from "./app/page-parts/Header";
import Footer from "./app/page-parts/Footer";
import {HashLoader} from "react-spinners";
import {useApi} from "./service/useApi";
import axios from "axios";
import config from "./config/config.json";
import TokenService from "./service/token.service";


export default function Main() {
    const appContext = useContext(AppContext);
    const {appState, setAppState} = appContext;
    const userContext = useContext(UserContext);
    const {userInformation, setUserInformation} = userContext;


    useEffect(() => {
        const retrieveAndSetLocalStorageUser = async () => {
            const localStorageUser = localStorage.getItem("user");
            if (!localStorageUser) {
                TokenService.removeUser();
                setAppState("LOGIN_REQUIRED");
                return;
            }
            const localStorageLoginState = localStorage.getItem("loginState");
            if (localStorageLoginState === "SMS_REQUIRED") {
                TokenService.removeUser();
                setAppState("LOGIN_REQUIRED");
                return;
            }
            const parsedUser = JSON.parse(localStorageUser);
            const {access_token, refresh_token} = parsedUser;
            const {data: accessTokenData, err: accessTokenErr} =
                await retrieveUserByAccessToken(access_token);
            if (accessTokenErr) {
                const {data: refreshTokenData, err: refreshTokenErr} =
                    await retrieveAccessTokenByRefreshToken(refresh_token, access_token);
                if (refreshTokenErr) {
                    TokenService.removeUser();
                    setAppState("LOGIN_REQUIRED");
                } else {
                    TokenService.setUser(refreshTokenData);
                    setUserInformation(TokenService.getUser(refreshTokenData));
                    setAppState("COMPLETED");
                }
            } else {
                TokenService.setUser(accessTokenData);
                setUserInformation(TokenService.getUser(accessTokenData));
                setAppState("COMPLETED");
            }
        };
        if (appState === "INITIALIZING") {
            retrieveAndSetLocalStorageUser();
        }
    }, [appState]);

    const retrieveUserByAccessToken = async (accessToken) => {
        try {
            const response = await axios.get(
                `${config.api.invokeUrl}/auth/by-accessToken`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            return {data: response.data};
        } catch (err) {
            return {err};
        }
    };

    const retrieveAccessTokenByRefreshToken = async (
        refreshToken,
        accessToken
    ) => {
        try {
            const response = await axios.post(
                `${config.api.invokeUrl}/auth/by-refreshToken`,
                {
                    accessToken,
                    refreshToken,
                }
            );
            return {data: response.data};
        } catch (err) {
            return {err};
        }
    };

    const compare = (a, b) => {
        if (a.sort < b.sort) {
            return -1;
        }
        if (a.sort > b.sort) {
            return 1;
        }
        return 0;
    };


    const RenderMainContent = () => {
        if (appState === "INITIALIZING") {
            return (
                <div className="h-100 flex-1 d-flex justify-content-center align-items-center">
                    <HashLoader color="#082070"/>
                </div>
            );
        } else if (appState === "LOGIN_REQUIRED") {
            return (<div className="content">
                <BrowserRouter>
                    <main>
                        <Routes>
                            {loginRoutes.sort(compare).map((route, key) => (
                                <Route
                                    key={key}
                                    path={route.path}
                                    element={<route.component {...route} />}
                                />
                            ))}
                            <Route path="*" element={<NoMatch/>}/>
                        </Routes>
                    </main>
                </BrowserRouter>
            </div>);
        } else if (appState === "COMPLETED") {
                return (
                    <div className="content">
                        <BrowserRouter>

                            <main style={{height: "100vh"}}>
                                <div
                                    className="h-100 d-flex flex-column justify-content-between"
                                    style={{overflowY: "auto"}}
                                >
                                    <div>
                                        <Header/>
                                    </div>
                                    <div className="h-100" style={{overflowY: "auto"}}>
                                        <Routes>
                                            {adminRoutes.sort(compare).map((route, key) => (
                                                <Route
                                                    key={key}
                                                    path={route.path}
                                                    element={<route.component {...route} />}
                                                />
                                            ))}
                                            <Route path="*" element={<NoMatch/>}/>
                                        </Routes>
                                    </div>
                                    <div>
                                        <Footer/>
                                    </div>
                                </div>
                            </main>
                        </BrowserRouter>
                    </div>
                );

        }
    };
    return (
        <div style={{height: "100vh"}}>
            {RenderMainContent()}
            {/* {userRole === "PARENT" ? <ContractMainPage /> : <Admin />} */}
        </div>
    );
}
