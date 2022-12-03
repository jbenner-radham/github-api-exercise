import fetch from 'node-fetch';
import { GITHUB_API_URL } from '../config.js';
import getDefaultHeaders from './util/get-default-headers.js';

/**
 * Fetch the commits for a pull request from GitHub
 *
 * @param {string} owner
 * @param {string} repo
 * @param {number} pullNumber
 * @returns {Promise<{}[]>}
 */
export default async function getPullRequestCommits(owner, repo, pullNumber) {
    const url = `${GITHUB_API_URL}repos/${owner}/${repo}/pulls/${pullNumber}/commits`;
    const headers = getDefaultHeaders();
    const response = await fetch(url, { headers });

    return response.json();
}
