import parseLinkHeader from '../../../../lib/github-api/util/parse-link-header.js';

const LINK_HEADER =
    '<https://api.github.com/user/repos?page=3&per_page=100>; rel="next",' +
    '  <https://api.github.com/user/repos?page=50&per_page=100>; rel="last"';

describe('parseLinkHeader', () => {
    it('is a function', () => {
        expect(typeof parseLinkHeader).toEqual('function');
    });

    it('returns an object', () => {
        expect(typeof parseLinkHeader(LINK_HEADER)).toEqual('object');
    });

    describe('when passed a valid link header', () => {
        it('returns an object with a valid next property', () => {
            expect(parseLinkHeader(LINK_HEADER).next).toEqual(
                'https://api.github.com/user/repos?page=3&per_page=100'
            );
        });

        it('returns an object with a valid last property', () => {
            expect(parseLinkHeader(LINK_HEADER).last).toEqual(
                'https://api.github.com/user/repos?page=50&per_page=100'
            );
        });
    });

    describe('when passed nothing', () => {
        it('returns an object with an empty string next property', () => {
            expect(parseLinkHeader().next).toEqual('');
        });

        it('returns an object with an empty string last property', () => {
            expect(parseLinkHeader().last).toEqual('');
        });
    });

    describe('when passed an invalid link header', () => {
        it('returns an object with an empty string next property', () => {
            expect(parseLinkHeader('kjkeruuiv73hnddl#@-~').next).toEqual('');
        });

        it('returns an object with an empty string last property', () => {
            expect(parseLinkHeader('kjkeruuiv73hnddl#@-~').last).toEqual('');
        });
    });
});
