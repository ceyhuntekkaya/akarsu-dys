import React, {useContext, useEffect} from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import {adminRoutes, loginRoutes} from "./config/route";
import NoMatch from "./app/general/NoMatch";
import Header from "./app/page-parts/Header";
import {HashLoader} from "react-spinners";
import {AppContext} from "./context/AppContextProvider";
import {UserContext} from "./context/UserContextProvider";
import TokenService from "./service/token.service";
import axios from "axios";

const config = require("./config/config.json");


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


const PrivateRoute = ({children}) => {
    const {appState} = useContext(AppContext);
    return appState === "COMPLETED" ? children : <Navigate to="/login"/>;
};

export default function Main() {
    const {appState, setAppState} = useContext(AppContext);
    const {setUserInformation} = useContext(UserContext);

    useEffect(() => {
        const verifyUserAuthentication = async () => {
            const localStorageUser = localStorage.getItem("user");
            const localStorageLoginState = localStorage.getItem("loginState");

            if (!localStorageUser || localStorageLoginState === "SMS_REQUIRED") {
                TokenService.removeUser();
                setAppState("LOGIN_REQUIRED");
                return;
            }

            try {
                const parsedUser = JSON.parse(localStorageUser);
                const {access_token, refresh_token} = parsedUser;

                const accessTokenResponse = await retrieveUserByAccessToken(access_token);
                if (accessTokenResponse.data) {
                    TokenService.setUser(accessTokenResponse.data);
                    setUserInformation(TokenService.getUser(accessTokenResponse.data));
                    setAppState("COMPLETED");
                    return;
                }

                const refreshTokenResponse = await retrieveAccessTokenByRefreshToken(refresh_token, access_token);
                if (refreshTokenResponse.data) {
                    TokenService.setUser(refreshTokenResponse.data);
                    setUserInformation(TokenService.getUser(refreshTokenResponse.data));
                    setAppState("COMPLETED");
                } else {
                    TokenService.removeUser();
                    setAppState("LOGIN_REQUIRED");
                }
            } catch (error) {
                TokenService.removeUser();
                setAppState("LOGIN_REQUIRED");
            }
        };

        if (appState === "INITIALIZING") {
            verifyUserAuthentication();
        }
    }, [appState]);

    const renderContent = () => {
        switch (appState) {
            case "INITIALIZING":
                return (
                    <div className="h-100 flex-1 d-flex justify-content-center align-items-center">
                        <HashLoader color="#082070"/>
                    </div>
                );
            case "LOGIN_REQUIRED":
                return (
                    <div className="content">
                        <main>
                            <Routes>
                                {loginRoutes.map((route, key) => (
                                    <Route
                                        key={key}
                                        path={route.path}
                                        element={<route.component {...route} />}
                                    />
                                ))}
                                <Route path="*" element={<NoMatch/>}/>
                            </Routes>
                        </main>
                    </div>
                );
            case "COMPLETED":
                return (
                    <div className="content">
                        <main style={{height: "100vh"}}>
                            <div
                                className="h-100 d-flex flex-column justify-content-between"
                                style={{overflowY: "auto"}}
                            >
                                <Header/>
                                <div className="h-100" style={{overflowY: "auto"}}>
                                    <Routes>
                                        {adminRoutes.map((route, key) => (
                                            <Route
                                                key={key}
                                                path={route.path}
                                                element={
                                                    <PrivateRoute>
                                                        <route.component {...route} />
                                                    </PrivateRoute>
                                                }
                                            />
                                        ))}
                                        <Route path="*" element={<NoMatch/>}/>
                                    </Routes>
                                </div>
                                {
                                    //   <Footer/>
                                }

                            </div>
                        </main>
                    </div>
                );
            default:
                return null;
        }
    };

    return <div style={{height: "100vh"}}>{renderContent()}</div>;
}