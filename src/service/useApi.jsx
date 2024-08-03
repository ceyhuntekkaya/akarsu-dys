import {useState} from "react";
import Request from "./Request";
const config = require("../config/config.json");

export const useApi = () => {
    const [result, setResult] = useState(null);

    const login = async (data) => {
        const response = await Request(
            "post",
            `${config.api.invokeUrl}/user/login`, data
        );
        if (response) {
            setResult(response);
        }
    };


    const myDocuments = async (data) => {
        const response = await Request(
            "get",
            `${config.api.invokeUrl}/document/user/${data}`
        );
        if (response) {
            console.log(response)
            setResult(response);
        }
    };


    const staff = async (data) => {
        const response = await Request(
            "get",
            `${config.api.invokeUrl}/user/staff/${data}`
        );
        if (response) {
            setResult(response);
        }
    };


    const handleChange = async (type, data) => {
        if (type === "login") {
            await login(data);
        } else if (type === "my-documents") {
            await myDocuments(data);
        }else if (type === "staff") {
            await staff(data);
        }
    };

    return [result, handleChange];
};
