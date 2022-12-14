import getDefaultHeaders from './get-default-headers.js';
import logger from '../../logger.js';
import parseLinkHeader from './parse-link-header.js';

/**
 * Paginate through a GitHub API resource provided an initial response or responses.
 *
 * @param {import('node-fetch').Response|import('node-fetch').Response[]} responseOrResponses
 * @returns {Promise<import('node-fetch').Response[]>}
 */
export default async function paginate(responseOrResponses = []) {
    const responses = Array.isArray(responseOrResponses)
        ? responseOrResponses
        : [responseOrResponses];
    const lastResponse = responses[responses.length - 1];

    if (!lastResponse?.headers?.get('link')) {
        return responses;
    }

    const headers = getDefaultHeaders();
    const { next } = parseLinkHeader(lastResponse.headers.get('link'));

    if (!next) {
        logger.debug(
            `The received Link header did not contain a "next" URL ${lastResponse.headers.get(
                'link'
            )}`
        );

        return responses;
    }

    logger.debug(`Fetching ${next}`);

    const response = await fetch(next, { headers });

    if (!response.ok) {
        logger.error(
            `Encountered a ${response.status} - ${response.statusText} response when fetching ${next}`
        );

        throw new Error(`${response.status} - ${response.statusText}`);
    }

    return paginate([...responses, response]);
}
