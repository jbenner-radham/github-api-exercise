import { GITHUB_API_ACCEPT_HEADER, GITHUB_API_VERSION } from '../../config.js';
import logger from '../../logger.js';

/**
 * @typedef {Object} DefaultHeaders
 * @property {string} Accept
 * @property {string} [Authorization]
 * @property {string} 'X-GitHub-Api-Version'
 */

/**
 * Get the default headers for a GitHub API request.
 *
 * @returns {DefaultHeaders}
 */
export default function getDefaultHeaders() {
    const headers = {
        Accept: GITHUB_API_ACCEPT_HEADER,
        'X-GitHub-Api-Version': GITHUB_API_VERSION
    };

    logger.debug(`Supplying default headers ${JSON.stringify(headers)}`);

    if (process.env.GITHUB_API_BEARER_TOKEN) {
        logger.debug('Adding GitHub API bearer token authorization header');

        headers.Authorization = `Bearer ${process.env.GITHUB_API_BEARER_TOKEN}`;
    }

    return headers;
}
