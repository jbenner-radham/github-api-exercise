import getPullRequests from '../github-api/get-pull-requests.js';
import getPullRequestCommits from '../github-api/get-pull-request-commits.js';
import logger from '../logger.js';
import parseRepositoryUrl from './util/parse-repository-url.js';

export default async function homeRoute(req, res) {
    const { repositoryUrl } = req.query;

    if (!repositoryUrl) {
        logger.warn(
            'A request was made which was missing the required "repositoryUrl" query parameter'
        );

        return res.status(400).json({
            error: true,
            message: 'The required "repositoryUrl" query parameter is missing.'
        });
    }

    const { owner, repo } = parseRepositoryUrl(repositoryUrl);

    if (!owner || !repo) {
        logger.warn(
            `A request was made which contained the invalid "repositoryUrl" query parameter ${repositoryUrl}`
        );

        return res.status(400).json({
            error: true,
            message: 'The provided "repositoryUrl" query parameter is invalid.'
        });
    }

    try {
        const pullRequests = await getPullRequests(owner, repo);
        const pullRequestsCommits = await Promise.all(
            pullRequests.map(pr =>
                getPullRequestCommits(owner, repo, pr.number)
            )
        );
        const response = pullRequests.map((pr, index) => ({
            author: pr.user.login,
            commit_count: pullRequestsCommits[index].length, // eslint-disable-line camelcase
            id: pr.id,
            number: pr.number,
            title: pr.title
        }));

        return res.json(response);
    } catch (error) {
        if (error?.message?.toLowerCase() === '404 - not found') {
            logger.info(`The repository ${repositoryUrl} was not found`);

            return res.status(404).json({
                error: true,
                message: 'The requested repository URL was not found.'
            });
        }

        logger.error(
            `An error occurred while processing a request for the "repositoryUrl" query parameter ${repositoryUrl}`
        );

        return res.status(500).json({
            error: true,
            message: 'An error occurred while processing your request.'
        });
    }
}
