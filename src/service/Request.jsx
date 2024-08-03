/* eslint-disable no-unused-vars */
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { convertToTurkish } from "../utilization/LanguageOperations";

export default async function Request(method, url, body) {
  const user = JSON.parse(localStorage.getItem("user"));

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      Authorization: `Bearer ${user?.access_token}`,
    },
  };

  if (method === "get") {
    try {
      const res = await axios.get(url, config);
      return res.data;
    } catch (err) {
      console.log(`Error: ${err}`);
      if (err.response && err.response.data) {
        NotificationManager.error(convertToTurkish(err.response.data));
      }
    }
  } else if (method === "patch") {
    try {
      const res = await axios.patch(url, body, config);
      return res.data;
    } catch (err) {
      console.log(`Error: ${err}`);
      if (err.response && err.response.data) {
        NotificationManager.error(convertToTurkish(err.response.data));
      }
    }
  } else if (method === "delete") {
    try {
      const res = await axios.delete(url, config);
      return res.data;
    } catch (err) {
      console.log(`Error: ${err}`);
      if (err.response && err.response.data) {
        NotificationManager.error(convertToTurkish(err.response.data));
      }
    }
  } else if (method === "post") {
    try {

      const res = await axios.post(url, body, config);
      return res.data;
    } catch (err) {
      console.log(`Error: ${err}`);
      if (err.response && err.response.data) {
        NotificationManager.error(convertToTurkish(err.response.data));
      }
    }
  } else if (method === "put") {
    try {
      const res = await axios.put(url, body, config);
      return res.data;
    } catch (err) {
      console.log(`Error: ${err}`);
      if (err.response && err.response.data) {
        NotificationManager.error(convertToTurkish(err.response.data));
      }
    }
  }
}
