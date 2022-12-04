import xss from 'xss';

/**
 * @typedef {Object} ParsedRepositoryUrl
 * @property {string} owner - The owner of the repository.
 * @property {string} repo - The repository name.
 */

/**
 * Parse a GitHub repository URL and extract route parameters.
 *
 * @param {string} repositoryUrl
 * @returns {ParsedRepositoryUrl}
 */
export default function parseRepositoryUrl(repositoryUrl) {
    const decodedUrl = decodeURI(repositoryUrl);

    // This is not strictly necessary but it doesn't hurt to be paranoid when it comes to security.
    const escapedUrl = xss(decodedUrl);

    try {
        const url = new URL(escapedUrl);
        const isNotEmptyString = value => value !== '';
        const [owner = '', repo = ''] = url.pathname
            .split('/')
            .filter(isNotEmptyString);

        return { owner, repo };
    } catch (_) {
        return { owner: '', repo: '' };
    }
}
