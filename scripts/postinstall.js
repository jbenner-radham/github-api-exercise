import * as fs from 'node:fs';

if (fs.existsSync('./.env')) {
    console.log(
        "It looks like you already have a `.env` file so we're skipping creating a new one."
    );
    process.exit(0);
}

if (!fs.existsSync('./.env.example')) {
    console.error(
        'Uh oh, it looks like your `.env.example` file is missing. Cannot create `.env` file.'
    );
    process.exit(1);
}

try {
    fs.copyFileSync('./.env.example', './.env');
    console.log(
        "We've created a `.env` file for you. Take a look at it to see the available configuration options."
    );
} catch (_) {
    console.error(
        'Sorry, we tried to create a new `.env` file for you but were unable to.'
    );
    process.exit(1);
}
