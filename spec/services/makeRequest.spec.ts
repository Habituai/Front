jest.mock('axios', () => {
    return jest.fn(() => ({
        data: 'data value',
    }));
});
jest.mock('../../src/config', () => ({ envs: { baseURL: 'base url' } }));

import axios from 'axios';
import { makeRequest } from '../../src/services/makeRequest';

describe('makeRequest', () => {
    it('should validate default values', async () => {
        await makeRequest('METHOD', 'url');

        expect(axios).toHaveBeenCalledWith({
            method: 'METHOD',
            baseURL: 'base url',
            url: 'url',
            params: {},
            data: {},
            headers: {
                'Content-Type': 'application/json',
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

        const result = await makeRequest('METHOD', 'url', filters);

        expect(result).toEqual('data value');
        expect(axios).toHaveBeenCalledWith({
            method: 'METHOD',
            baseURL: 'base url',
            url: 'url',
            params: { a: 1 },
            data: { value: 1 },
            headers: {
                'Content-Type': 'application/json',
                headerTest: true,
            },
        });
    });
});
