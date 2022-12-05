import { afterAll, describe, expect, it } from '@jest/globals';
import getDefaultHeaders from '../../../../lib/github-api/util/get-default-headers.js';

const githubApiBearerTokenBackup = process.env.GITHUB_API_BEARER_TOKEN;

describe('getDefaultHeaders', () => {
    afterAll(() => {
        process.env.GITHUB_API_BEARER_TOKEN = githubApiBearerTokenBackup;
    });

    it('is a function', () => {
        expect(typeof getDefaultHeaders).toEqual('function');
    });

    it('returns an object', () => {
        expect(typeof getDefaultHeaders()).toEqual('object');
    });

    describe('when $GITHUB_API_BEARER_TOKEN is set', () => {
        it('returns the relevant object keys', () => {
            process.env.GITHUB_API_BEARER_TOKEN = '13@7#4F';

            expect(Object.keys(getDefaultHeaders())).toEqual([
                'Accept',
                'X-GitHub-Api-Version',
                'Authorization'
            ]);
        });
    });

    describe('when $GITHUB_API_BEARER_TOKEN is unset', () => {
        it('returns the relevant object keys', () => {
            process.env.GITHUB_API_BEARER_TOKEN = '';

            expect(Object.keys(getDefaultHeaders())).toEqual([
                'Accept',
                'X-GitHub-Api-Version'
            ]);
        });
    });
});
