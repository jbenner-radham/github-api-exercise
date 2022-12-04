import { describe, expect, it } from '@jest/globals';
import parseRepositoryUrl from '../../../../lib/routes/util/parse-repository-url.js';

const REPO_URL = 'https://github.com/charmbracelet/vhs';

describe('parseRepositoryUrl', () => {
    it('is a function', () => {
        expect(typeof parseRepositoryUrl).toEqual('function');
    });

    it('returns an object', () => {
        expect(typeof parseRepositoryUrl(REPO_URL)).toEqual('object');
    });

    describe('when passed a valid repository URL', () => {
        it('returns a valid owner property', () => {
            expect(parseRepositoryUrl(REPO_URL).owner).toEqual('charmbracelet');
        });

        it('returns a valid repo property', () => {
            expect(parseRepositoryUrl(REPO_URL).repo).toEqual('vhs');
        });
    });

    describe('when passed an invalid repository URL', () => {
        it('returns a an empty string owner property', () => {
            expect(parseRepositoryUrl().owner).toEqual('');
        });

        it('returns a an empty string repo property', () => {
            expect(parseRepositoryUrl().repo).toEqual('');
        });
    });
});
