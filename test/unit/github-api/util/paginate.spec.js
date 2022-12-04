import { jest } from '@jest/globals';
import { Response } from 'node-fetch';
import paginate from '../../../../lib/github-api/util/paginate.js';

globalThis.fetch = jest.fn();

const LINK_HEADER =
    '<https://api.github.com/user/repos?page=3&per_page=100>; rel="next",' +
    '  <https://api.github.com/user/repos?page=50&per_page=100>; rel="last"';

describe('paginate', () => {
    it('is a function', () => {
        expect(typeof paginate).toEqual('function');
    });

    it('returns an array', async () => {
        const responses = await paginate();

        expect(Array.isArray(responses)).toBe(true);
    });

    describe('when passed a response with a link header', () => {
        it('returns an array of responses', async () => {
            globalThis.fetch.mockResolvedValueOnce(new Response('two'));

            const headers = { link: LINK_HEADER };
            const response = new Response('one', { headers });
            const responses = await paginate(response);

            expect(responses.every(res => res instanceof Response)).toBe(true);
        });

        it('returns the original response in an array', async () => {
            globalThis.fetch.mockResolvedValueOnce(new Response('two'));

            const headers = { link: LINK_HEADER };
            const response = new Response('one', { headers });
            const responses = await paginate(response);

            expect(await responses[0].text()).toBe('one');
        });

        it('returns the paged response in an array', async () => {
            globalThis.fetch.mockResolvedValueOnce(new Response('two'));

            const headers = { link: LINK_HEADER };
            const response = new Response('one', { headers });
            const responses = await paginate(response);

            expect(await responses[1].text()).toBe('two');
        });
    });
});
