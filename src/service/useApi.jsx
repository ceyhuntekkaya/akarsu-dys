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



    const documentTypes = async () => {
        const types = [{name: "GELEN EVRAK"}, {name: "GİDEN EVRAK"}]
        setResult(types);
    };
    const groups = async () => {
        const groups = [{name: "PROJE"}, {name: "PLANLAMA"}, {name: "GENEL"}]
        setResult(groups);
    };
    const auths = async () => {
        const auths = [{id:0, name: "PERSONEL"}, {id:1, name: "PROJE PERSONELİ"}, {id:2, name: "PROJE KOORDİNATÖRÜ"}, {id:1, name: "YÖNETİM"}]
        setResult(auths);
    };
    const owners = async (data) => {
        const response = await Request(
            "get",
            `${config.api.invokeUrl}/user/staff/${data}`
        );
        if (response) {
            setResult(response);
        }
    };

    const findProjectByAuth = async (data) => {
        const response = await Request(
            "get",
            `${config.api.invokeUrl}/project/auth/${data}`
        );
        if (response) {
            setResult(response);
        }
    };


    const searchProject = async (data) => {
        const response = await Request(
            "post",
            `${config.api.invokeUrl}/document/search/`,data
        );
        if (response) {
            setResult(response);
        }
    };



    const findProjectByActive = async () => {
        const response = await Request(
            "get",
            `${config.api.invokeUrl}/project/active/`
        );
        if (response) {
            setResult(response);
        }
    };
    const findProjectByDeActive = async (data) => {
        const response = await Request(
            "get",
            `${config.api.invokeUrl}/project/active/0`
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
        } else if (type === "staff") {
            await staff(data);
        } else if (type === "projects") {
            await findProjectByDeActive();
        } else if (type === "documentTypes") {
            await documentTypes();
        } else if (type === "groups") {
            await groups();
        } else if (type === "auths") {
            await auths();
        } else if (type === "owners") {
            await owners(data);
        } else if (type === "findProjectByAuth") {
            await findProjectByAuth(data);
        } else if (type === "searchProject") {
            await searchProject(data);
        } else if (type === "findProjectByActive") {
            await findProjectByActive();
        }

    };

    return [result, handleChange];
};
