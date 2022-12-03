import fetch from 'node-fetch';
import { GITHUB_API_URL } from '../config.js';
import getDefaultHeaders from './util/get-default-headers.js';

/**
 * Fetch pull requests for a repo on GitHub.
 *
 * @param {string} owner
 * @param {string} repo
 * @returns {Promise<{}[]>}
 * @see {@link https://docs.github.com/en/rest/pulls/pulls?apiVersion=2022-11-28#list-pull-requests}
 */
export default async function getPullRequests(owner, repo) {
    const url = `${GITHUB_API_URL}repos/${owner}/${repo}/pulls`;
    const headers = getDefaultHeaders();
    const response = await fetch(url, { headers });

    return response.json();
}
