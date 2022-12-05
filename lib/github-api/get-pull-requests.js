import fetch from 'node-fetch';
import { GITHUB_API_PER_PAGE, GITHUB_API_URL } from '../config.js';
import getDefaultHeaders from './util/get-default-headers.js';
import logger from '../logger.js';
import paginate from './util/paginate.js';

/**
 * This is an incomplete representation of a pull request object due to it's size.
 * Only properties that we use are listed.
 *
 * @typedef {Object} PullRequest
 * @property {number} id
 * @property {number} number
 * @property {string} title
 * @property {Object} user
 * @property {string} user.login
 */

/**
 * Fetch pull requests for a repo on GitHub.
 *
 * @param {string} owner
 * @param {string} repo
 * @returns {Promise<PullRequest[]>}
 * @see {@link https://docs.github.com/en/rest/pulls/pulls?apiVersion=2022-11-28#list-pull-requests}
 */
export default async function getPullRequests(owner, repo) {
    const url = `${GITHUB_API_URL}repos/${owner}/${repo}/pulls?per_page=${GITHUB_API_PER_PAGE}`;
    const headers = getDefaultHeaders();

    logger.debug(`Fetching ${url}`);

    const response = await fetch(url, { headers });

    if (!response.ok) {
        logger.error(
            `Encountered a ${response.status} - ${response.statusText} response when fetching ${url}`
        );

        throw new Error(`${response.status} - ${response.statusText}`);
    }

    const responses = await paginate(response);
    const jsons = await Promise.all(responses.map(response => response.json()));

    return jsons.reduce((accumulator, json) => [...accumulator, ...json], []);
}
