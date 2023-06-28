import axios from 'axios';
import { envs } from '../config';

const baseURL = envs.baseURL;

export async function makeRequest(method: string, url: string, { params = {}, data = {}, headers = {} } = {}) {
    const response = await axios({
        method,
        baseURL,
        url,
        params,
        data,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
    });

    return response.data;
}
