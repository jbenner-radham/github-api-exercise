GitHub API Exercise
===================
[![CI Status][CI BADGE]][CI PAGE]

An excercise to expose GitHub PR info via an API **without** using [Octokit](https://github.com/octokit).

Getting Started
---------------
After cloning or downloading this repository install it's dependencies via:

```sh
npm install
```

After installation is complete a new `.env` file will created at your project root.
Inspect it to see the various runtime configuration options available to you. Of note
is the `$GITHUB_API_BEARER_TOKEN` environment variable. While this is technically
optional using this API without one set will quickly become rate limited by GitHub so
it is recommended to provide one. See [here](https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api?apiVersion=2022-11-28#authenticating) for details
on how to create one.

Once you're ready you can start the app like so:

```sh
npm start
```

Look in the console for a message along the lines of "App listening on port $PORT." Make note of the port and then you can visit the API at `http://localhost:$PORT` replacing `$PORT` with your port number. To specify a repository to query simply provide it's URL via a `?repositoryUrl` query parameter _e.g._, http://localhost:8080/?repositoryUrl=https://github.com/jbenner-radham/status-cod.es

Calling the API will result in a response like this:

```json
[
    {
        "author":"hanbin9775",
        "commit_count":1,
        "id":1144919761,
        "number":355,
        "title":"fix: Encode fragmentIdentifier with encodeURI method not encodeURIComponent at stringifyUrl"
    },
    {
        "author":"kstenerson-ab",
        "commit_count":1,
        "id":1141685590,
        "number":352,
        "title":"Allow multi-charactor separators"
    }
]
```

If there are no open pull requests you'll simply receive an empty array as your response.

```json
[]
```

Developing
----------
If you want to start hacking on the codebase there are several aspects that we'll cover below that will help you along your way.

### Scripts
* `npm run postinstall` - This script isn't meant to be run manually but if you choose to do so it will create a new `.env` file for you if you don't currently have one.
* `npm run lint` - This script will lint your codebase with [ESLint](https://eslint.org/). It does not fix any lint errors encountered because that is covered by the pre-commit hook.
* `npm run prepare` - This script isn't meant to be run manually. For reference it sets up the project Git hooks via [Husky](https://typicode.github.io/husky/).
* `npm start` - This starts the app.
* `npm run start:watch` - Start the app but watch for file changes and reload when they occur. This is the preferred way to run the app during development.
* `npm test` - This will run all the project tests.
* `npm run test:watch` - This will run all the project tests and then watch for file changes and re-run the relevant test(s).

### File Structure
* `.github/` - This is where the [GitHub Actions](https://docs.github.com/en/actions) CI workflow code lives.
* `.husky/` - The project GitHooks are located here.
* `lib/` - This is where all the app code lives.
* `lib/github-api/` - All code that calls out to the GitHub API is here.
* `lib/routes/` - The [Express](https://expressjs.com/) routes are located here.
* `lib/*/util/` - Utility libraries scoped to their parent directories.
* `scripts/` - The [npm](https://www.npmjs.com/) event scripts are stored here.
* `test/` - All the [Jest](https://jestjs.io/) project tests are housed here.

### Important Files
* `lib/config.js` - While some configuration is handled via environment variables the more "hard coded" settings are located here. These are settings which wouldn't likely be changed via runtime configuration.
* `lib/index.js` - The [Express](https://expressjs.com/) app object itself. The app is completely configured in this file and then exported.
* `lib/logger.js` - The app level logger. Powered by [Winston](https://www.npmjs.com/package/winston).
* `lib/server.js` - Merely imports the app object from `lib/index.js` and starts a server.
* `.eslintrc.yaml` - The configuration file for [ESLint](https://eslint.org/).
* `.lintstagedrc.yaml` - This configuration file specifies the processes to be run on staged files during the pre-commit Git hook.
* `.prettierrc.yaml` - A configuration file for [Prettier](https://prettier.io/), which is run via a [ESLint](https://eslint.org/) plugin.
* `jest.config.mjs` - The configuration file for the [Jest](https://jestjs.io/) testing framework.

License
-------
The MIT License (Expat). See the [license file](LICENSE) for details.

[CI BADGE]: https://github.com/jbenner-radham/github-api-exercise/actions/workflows/ci.yaml/badge.svg
[CI PAGE]: https://github.com/jbenner-radham/github-api-exercise/actions/workflows/ci.yaml
