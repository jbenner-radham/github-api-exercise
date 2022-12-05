import { describe, expect, it, jest } from '@jest/globals';
import request from 'supertest';

jest.unstable_mockModule('../../lib/github-api/get-pull-requests.js', () => ({
    default: async () => []
}));
jest.unstable_mockModule(
    '../../lib/github-api/get-pull-request-commits.js',
    () => ({
        default: async () => []
    })
);

const { default: app } = await import('../../lib/index.js');

describe('API', () => {
    describe('when not provided a "repositoryUrl" query parameter', () => {
        it('returns a 400 status code', done => {
            request(app)
                .get('/')
                .expect('Content-Type', /json/)
                .expect(400, done);
        });

        it('returns a JSON body describing the error', done => {
            request(app)
                .get('/')
                .expect('Content-Type', /json/)
                .then(response => {
                    expect(response.body).toEqual({
                        error: true,
                        message:
                            'The required "repositoryUrl" query parameter is missing.'
                    });
                    done();
                });
        });
    });

    describe('when provided an invalid "repositoryUrl" query parameter', () => {
        it('returns a 400 status code', done => {
            request(app)
                .get('/?repositoryUrl=https://')
                .expect('Content-Type', /json/)
                .expect(400, done);
        });

        it('returns a JSON body describing the error', done => {
            request(app)
                .get('/?repositoryUrl=https://')
                .expect('Content-Type', /json/)
                .then(response => {
                    expect(response.body).toEqual({
                        error: true,
                        message:
                            'The provided "repositoryUrl" query parameter is invalid.'
                    });
                    done();
                });
        });
    });

    describe('when provided a valid "repositoryUrl" query parameter', () => {
        it('returns a 200 status code', done => {
            request(app)
                .get(
                    `/?repositoryUrl=https://github.com/jbenner-radham/status-cod.es`
                )
                .expect('Content-Type', /json/)
                .expect(200, done);
        });

        it('returns an empty array when no results are found', done => {
            request(app)
                .get(
                    `/?repositoryUrl=https://github.com/jbenner-radham/status-cod.es`
                )
                .expect('Content-Type', /json/)
                .then(response => {
                    expect(response.body).toEqual([]);
                    done();
                });
        });
    });
});
