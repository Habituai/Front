import axios from "axios";

export default async function makeRequest(
    method,
    url,
    { params = {}, data = {}, headers = {} } = {}
) {
    const baseURL = import.meta.env.VITE_HOST_BACKEND;

    const response = await axios({
        method,
        baseURL,
        url,
        params,
        data,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
    });

    return response.data;
}
