import { describe, expect, it, jest } from '@jest/globals';
import request from 'supertest';

jest.unstable_mockModule('../../lib/github-api/get-pull-requests.js', () => ({
    default: async () => [
        {
            id: 1,
            number: 1001,
            title: 'PR 1',
            user: {
                login: 'user1'
            }
        },
        {
            id: 2,
            number: 1002,
            title: 'PR 2',
            user: {
                login: 'user2'
            }
        }
    ]
}));
jest.unstable_mockModule(
    '../../lib/github-api/get-pull-request-commits.js',
    () => ({
        default: async () => [{}, {}]
    })
);

const { default: app } = await import('../../lib/index.js');

describe('API', () => {
    describe('when provided a "repositoryUrl" which has PRs', () => {
        it('returns a 200 status code', done => {
            request(app)
                .get('/?repositoryUrl=https://github.com/facebook/jest')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });

        it('returns a JSON body describing the results', done => {
            request(app)
                .get('/?repositoryUrl=https://github.com/facebook/jest')
                .expect('Content-Type', /json/)
                .then(response => {
                    expect(response.body).toEqual([
                        {
                            author: 'user1',
                            commit_count: 2, // eslint-disable-line camelcase
                            id: 1,
                            number: 1001,
                            title: 'PR 1'
                        },
                        {
                            author: 'user2',
                            commit_count: 2, // eslint-disable-line camelcase
                            id: 2,
                            number: 1002,
                            title: 'PR 2'
                        }
                    ]);
                    done();
                });
        });
    });
});
