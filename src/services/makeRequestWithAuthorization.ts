import Cookies from 'js-cookie';
import { makeRequest } from './makeRequest';

export async function makeRequestWithAuthorization(
    method: string,
    url: string,
    { params = {}, data = {}, headers = {} } = {},
) {
    const token = Cookies.get('token');

    return await makeRequest(method, url, {
        params,
        data,
        headers: {
            Authorization: token,
            ...headers,
        },
    });
}
