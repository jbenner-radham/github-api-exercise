import fetch from 'node-fetch';
import { GITHUB_API_PER_PAGE, GITHUB_API_URL } from '../config.js';
import getDefaultHeaders from './util/get-default-headers.js';
import paginate from './util/paginate.js';

/**
 * Fetch pull requests for a repo on GitHub.
 *
 * @param {string} owner
 * @param {string} repo
 * @returns {Promise<{}[]>}
 * @see {@link https://docs.github.com/en/rest/pulls/pulls?apiVersion=2022-11-28#list-pull-requests}
 */
export default async function getPullRequests(owner, repo) {
    const url = `${GITHUB_API_URL}repos/${owner}/${repo}/pulls?per_page=${GITHUB_API_PER_PAGE}`;
    const headers = getDefaultHeaders();
    const response = await fetch(url, { headers });
    const responses = await paginate(response);
    const jsons = await Promise.all(responses.map(response => response.json()));

    return jsons.reduce((accumulator, json) => [...accumulator, ...json], []);
}
