import axios from "axios";

const config = require("../config/config.json");


export const uploadFileToPath = async (formData) => {
    try {
        const response = await axios.post(
            `${config.api.invokeUrl}/storage/upload/file`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return { data: response.data, status: response.status };
    } catch (err) {
        return { err };
    }
};

