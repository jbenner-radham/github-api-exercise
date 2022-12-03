import xss from 'xss';
import getPullRequests from '../github-api/get-pull-requests.js';
import getPullRequestCommits from '../github-api/get-pull-request-commits.js';

function parseRepositoryUrl(repositoryUrl) {
    const decodedUrl = decodeURI(repositoryUrl);
    const escapedUrl = xss(decodedUrl);
    const url = new URL(escapedUrl);
    const isNotEmptyString = value => value !== '';
    const [owner, repo] = url.pathname.split('/').filter(isNotEmptyString);

    return { owner, repo };
}

export default async function homeRoute(req, res) {
    const repositoryUrl = req.query.repositoryUrl;
    const { owner, repo } = parseRepositoryUrl(repositoryUrl);
    const pullRequests = await getPullRequests(owner, repo);
    const pullRequestsCommits = await Promise.all(
        pullRequests.map(pr => getPullRequestCommits(owner, repo, pr.number))
    );
    const response = pullRequests.map((pr, index) => ({
        author: pr.user.login,
        commit_count: pullRequestsCommits[index].length, // eslint-disable-line camelcase
        id: pr.id,
        number: pr.number,
        title: pr.title
    }));

    return res.json(response);
}
