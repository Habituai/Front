jest.mock('../../src/config', () => ({ envs: { baseURL: 'base url' } }));

import Cookies from 'js-cookie';
import * as makeRequest from '../../src/services/makeRequest';
import { makeRequestWithAuthorization } from '../../src/services/makeRequestWithAuthorization';

describe('makeRequestWithAuthorization', () => {
    beforeAll(() => {
        jest.spyOn(makeRequest, 'makeRequest').mockImplementation(() => Promise.resolve('data value'));
        jest.spyOn(Cookies, 'get').mockImplementation(() => 'token value');
    });

    it('should validate default values', async () => {
        await makeRequestWithAuthorization('METHOD', 'url');

        expect(Cookies.get).toHaveBeenCalledWith('token');
        expect(makeRequest.makeRequest).toHaveBeenCalledWith('METHOD', 'url', {
            data: {},
            params: {},
            headers: {
                Authorization: 'token value',
            },
        });
    });

    it('should validate parameters values', async () => {
        const filters = {
            params: { a: 1 },
            data: {
                value: 1,
            },
            headers: {
                headerTest: true,
            },
        };

        const result = await makeRequestWithAuthorization('METHOD', 'url', filters);

        expect(result).toEqual('data value');
        expect(makeRequest.makeRequest).toHaveBeenCalledWith('METHOD', 'url', {
            params: { a: 1 },
            data: {
                value: 1,
            },
            headers: {
                Authorization: 'token value',
                headerTest: true,
            },
        });
    });
});
