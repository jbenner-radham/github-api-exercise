import { describe, expect, it, jest } from '@jest/globals';
import request from 'supertest';

jest.unstable_mockModule('../../lib/github-api/get-pull-requests.js', () => ({
    default: async () => {
        throw new Error('403 - forbidden');
    }
}));

const { default: app } = await import('../../lib/index.js');

describe('API', () => {
    describe('when the server encounters an error', () => {
        it('returns a 500 status code', done => {
            request(app)
                .get('/?repositoryUrl=https://github.com/expressjs/express')
                .expect('Content-Type', /json/)
                .expect(500, done);
        });

        it('returns a JSON body describing the error', done => {
            request(app)
                .get('/?repositoryUrl=https://github.com/expressjs/express')
                .expect('Content-Type', /json/)
                .then(response => {
                    expect(response.body).toEqual({
                        error: true,
                        message:
                            'An error occured while processing your request.'
                    });
                    done();
                });
        });
    });
});
