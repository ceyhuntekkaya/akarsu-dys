import {useContext, useState} from "react";
import {UserContext} from "../context/UserContextProvider";
import Request from "./Request";

const config = require("../config/config.json");

export const useAuth = () => {
    const userContext = useContext(UserContext);
    const {setUserInformation} = userContext;
    const [result, setResult] = useState(null);

    const handleLogin = async (params) => {
        setResult(false);


        console.log(`${config.api.invokeUrl}/user/login`)
        console.log(params)
        const response = await Request(
            "post",
            `${config.api.invokeUrl}/user/login`, params
        );

        console.log(response)


        if (response) {
            setUserInformation(response)
            console.log(response)
            setResult(true);
        }


        /*
            try {
              const response = await axios.post(
                `${config.api.invokeUrl}/auth/authenticate`,
                params
              );
              if (response.data.access_token) {
                TokenService.setUser(response.data);
                setUserInformation(TokenService.getUser(response.data));
                localStorage.setItem("loginState", "SMS_REQUIRED");
                setResult(true);
              } else {
                setResult(false);
              }
            } catch (err) {
              setResult(`An error has occurred: ${err}`);
              console.log(`An error has occurred: ${err}`);
            }

         */
    };


    const handleChange = async (type, params) => {
        if (type === "login") {
            handleLogin(params);
        }
    };
    return [result, handleChange];
};
