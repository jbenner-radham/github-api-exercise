import fetch from 'node-fetch';
import { GITHUB_API_PER_PAGE, GITHUB_API_URL } from '../config.js';
import getDefaultHeaders from './util/get-default-headers.js';
import paginate from './util/paginate.js';

/**
 * Fetch the commits for a pull request from GitHub.
 *
 * @param {string} owner
 * @param {string} repo
 * @param {number} pullNumber
 * @returns {Promise<{}[]>}
 * @see {@link https://docs.github.com/en/rest/pulls/pulls?apiVersion=2022-11-28#list-commits-on-a-pull-request}
 */
export default async function getPullRequestCommits(owner, repo, pullNumber) {
    const url = `${GITHUB_API_URL}repos/${owner}/${repo}/pulls/${pullNumber}/commits?per_page=${GITHUB_API_PER_PAGE}`;
    const headers = getDefaultHeaders();
    const response = await fetch(url, { headers });
    const responses = await paginate(response);
    const jsons = await Promise.all(responses.map(response => response.json()));

    return jsons.reduce((accumulator, json) => [...accumulator, ...json], []);
}
