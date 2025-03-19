import axios from "axios";

export const axiosInstanse = axios.create({
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
});