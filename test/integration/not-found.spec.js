import { describe, expect, it, jest } from '@jest/globals';
import request from 'supertest';
import logger from '../../lib/logger.js';

logger.configure({ silent: true });

jest.unstable_mockModule('../../lib/github-api/get-pull-requests.js', () => ({
    default: async () => {
        throw new Error('404 - not found');
    }
}));

const { default: app } = await import('../../lib/index.js');

describe('API', () => {
    describe('when the server cannot find a repository', () => {
        it('returns a 404 status code', done => {
            request(app)
                .get(
                    '/?repositoryUrl=https://github.com/djkfjdkfcmxmvvwirpfjdfjuecekjjerhhjdfdf/dne'
                )
                .expect('Content-Type', /json/)
                .expect(404, done);
        });

        it('returns a JSON body describing the error', done => {
            request(app)
                .get(
                    '/?repositoryUrl=https://github.com/djkfjdkfcmxmvvwirpfjdfjuecekjjerhhjdfdf/dne'
                )
                .expect('Content-Type', /json/)
                .then(response => {
                    expect(response.body).toEqual({
                        error: true,
                        message: 'The requested repository URL was not found.'
                    });
                    done();
                });
        });
    });
});
