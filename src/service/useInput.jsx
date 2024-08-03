import { useState } from "react";

export const useInput = (params) => {
    const [inputs, setInputs] = useState(params);

    const handleChange = (event) => {
        if (event.target) {
            let name = event.target.name;
            let value = event.target.value;

            if (event.target.type === "checkbox") {
                value = event.target.checked;
            }
            let data = inputs;
            data[name] = value;

            setInputs({ ...data });
        } else {
            setInputs(event);
        }
    };
    return [inputs, handleChange];
};
