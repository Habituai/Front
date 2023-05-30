import axios from "axios";
import Cookies from "js-cookie";

const baseURL = import.meta.env.VITE_HOST_BACKEND;

export async function makeRequest(
    method,
    url,
    { params = {}, data = {}, headers = {} } = {}
) {
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

export async function makeRequestWithAuthorization(
    method,
    url,
    { params = {}, data = {}, headers = {} } = {}
) {
    const token = Cookies.get("token");

    return await makeRequest(method, url, {
        params,
        data,
        headers: {
            Authorization: token,
            ...headers,
        },
    });
}
