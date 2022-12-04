/**
 * @typedef {Object} LinkHeader
 * @property {string} next - The next pagination URL.
 * @property {string} last - The last pagination URL.
 */

/**
 * Parse a "Link" header from the GitHub API.
 *
 * @param {string} linkHeader
 * @returns {LinkHeader}
 * @see {@link https://docs.github.com/en/rest/overview/resources-in-the-rest-api?apiVersion=2022-11-28#link-header}
 */
export default function parseLinkHeader(linkHeader = '') {
    const [, next, last] =
        linkHeader.match(/^<(.+)>; rel="next", +<(.+)>; rel="last"$/) ?? [];

    return { last, next };
}
