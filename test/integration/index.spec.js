import { describe, expect, it } from '@jest/globals';
import request from 'supertest';
import app from '../../lib/index.js';

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
});
