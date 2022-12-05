import getPullRequests from '../github-api/get-pull-requests.js';
import getPullRequestCommits from '../github-api/get-pull-request-commits.js';
import parseRepositoryUrl from './util/parse-repository-url.js';

export default async function homeRoute(req, res) {
    const { repositoryUrl } = req.query;

    if (!repositoryUrl) {
        return res.status(400).json({
            error: true,
            message: 'The required "repositoryUrl" query parameter is missing.'
        });
    }

    const { owner, repo } = parseRepositoryUrl(repositoryUrl);

    if (!owner || !repo) {
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
    } catch (_) {
        return res.status(500).json({
            error: true,
            message: 'An error occured while processing your request.'
        });
    }
}
