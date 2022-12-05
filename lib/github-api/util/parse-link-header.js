/**
 * @typedef {Object} LinkHeader
 * @property {string} next - The next pagination URL.
 * @property {string} last - The last pagination URL.
 */

/**
 * Parse a "Link" header from the GitHub API.
 *
 * Note: A Link header may also match the form of `<$URL>; rel="prev", <$URL>; rel="first"`
 * but we're ignoring that format since we have no need for it.
 *
 * @param {string} linkHeader
 * @returns {LinkHeader}
 * @see {@link https://docs.github.com/en/rest/overview/resources-in-the-rest-api?apiVersion=2022-11-28#link-header}
 */
export default function parseLinkHeader(linkHeader = '') {
    const [, next = '', last = ''] =
        linkHeader.match(/^<(.+)>; rel="next", +<(.+)>; rel="last"$/) ?? [];

    return { last, next };
}
