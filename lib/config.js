// The default log level for the app. This can be overridden by the $APP_LOG_LEVEL environment variable.
// See <https://www.npmjs.com/package/winston#logging-levels>
export const APP_DEFAULT_LOG_LEVEL = 'info';

// The default port to bind the app to. This can be overridden by the $APP_PORT environment variable.
export const APP_DEFAULT_PORT = 8080;

// The value to set the "Accept" header to when using the GitHub API.
export const GITHUB_API_ACCEPT_HEADER = 'application/vnd.github+json';

// The value to set the GitHub API "?per_page" query param to. This has a max value of 100.
export const GITHUB_API_PER_PAGE = 100;

// The base URL of the GitHub API. Must have trailing forward slash.
export const GITHUB_API_URL = 'https://api.github.com/';

// The GitHub API version to use.
// See <https://docs.github.com/en/rest/overview/api-versions?apiVersion=2022-11-28>
export const GITHUB_API_VERSION = '2022-11-28';
