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
        const auths = [{id: 0, name: "PERSONEL"}, {id: 1, name: "PROJE PERSONELİ"}, {
            id: 2,
            name: "PROJE KOORDİNATÖRÜ"
        }, {id: 1, name: "YÖNETİM"}]
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
            `${config.api.invokeUrl}/document/search/`, data
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
            `${config.api.invokeUrl}/project/active/${data}`
        );
        if (response) {
            setResult(response);
        }
    };


    const documentSend = async (data) => {
        const response = await Request(
            "post",
            `${config.api.invokeUrl}/document/send/`, data
        );
        if (response) {
            setResult(response);
        }
    };





    const getTransactions = async (documentId) => {
        const response = await Request(
            "get",
            `${config.api.invokeUrl}/document/transaction/${documentId}`
        );
        if (response) {
            setResult(response);
        }
    };





    const findByIdFiles = async (documentId) => {
        const response = await Request(
            "get",
            `${config.api.invokeUrl}/document/document/${documentId}/files/`
        );
        if (response) {
            setResult(response);
        }
    };
    const findByIdLogs = async (documentId) => {
        const response = await Request(
            "get",
            `${config.api.invokeUrl}/document/document/${documentId}/logs/`
        );
        if (response) {
            setResult(response);
        }
    };



    const saveDocument = async (document) => {
        const response = await Request(
            "post",
            `${config.api.invokeUrl}/document/`,document
        );
        if (response) {
            setResult(response);
        }
    };




    const findAllProject = async (data) => {
        const response = await Request(
            "get",
            `${config.api.invokeUrl}/project/all/${data}`, data
        );
        if (response) {
            setResult(response);
        }
    };


    const getAuthority = async (data) => {
        const response = await Request(
            "get",
            `${config.api.invokeUrl}/user/authority/${data}`
        );
        if (response) {
            setResult(response);
        }
    };




    const updateAuthority = async (data) => {
        const response = await Request(
            "get",
            `${config.api.invokeUrl}/user/authority/${data["userId"]}/${data["authority"]}/${data["operation"]}`
        );
        if (response) {
            setResult(response);
        }
    };

    const addUser = async (data) => {
        const response = await Request(
            "post",
            `${config.api.invokeUrl}/user/`, data
        );
        if (response) {
            setResult(response);
        }
    };
    const updateUser = async (data) => {
        const response = await Request(
            "patch",
            `${config.api.invokeUrl}/user/`, data
        );
        if (response) {
            setResult(response);
        }
    };
    const deleteUser = async (data) => {
        const response = await Request(
            "delete",
            `${config.api.invokeUrl}/user/${data}`
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
        } else if (type === "findProjectByAuth") {
            await findProjectByAuth(data);
        } else if (type === "searchProject") {
            await searchProject(data);
        } else if (type === "findProjectByActive") {
            await findProjectByActive();
        } else if (type === "documentSend") {
            await documentSend(data);
        }else if (type === "getTransactions") {
            await getTransactions(data);
        }else if (type === "findByIdFiles") {
            await findByIdFiles(data);
        }else if (type === "findByIdLogs") {
            await findByIdLogs(data);
        }else if (type === "saveDocument") {
            await saveDocument(data);
        }else if (type === "findAllProject") {
            await findAllProject(data);
        }
        else if (type === "updateAuthority") {
            await updateAuthority(data);
        }else if (type === "addUser") {
            await addUser(data);
        }else if (type === "updateUser") {
            await updateUser(data);
        }else if (type === "deleteUser") {
            await deleteUser(data);
        }else if (type === "getAuthority") {
            await getAuthority(data);
        }


    };

    return [result, handleChange];
};
