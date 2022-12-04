import { GITHUB_API_ACCEPT_HEADER, GITHUB_API_VERSION } from '../../config.js';

export default function getDefaultHeaders() {
    const headers = {
        Accept: GITHUB_API_ACCEPT_HEADER,
        'X-GitHub-Api-Version': GITHUB_API_VERSION
    };

    if (process.env.GITHUB_API_BEARER_TOKEN) {
        headers.Authorization = `Bearer ${process.env.GITHUB_API_BEARER_TOKEN}`;
    }

    return headers;
}
