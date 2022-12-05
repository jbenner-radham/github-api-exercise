import dotenv from 'dotenv';
import { APP_DEFAULT_PORT } from './config.js';
import app from './index.js';
import logger from './logger.js';

dotenv.config();

const port = process.env.APP_PORT ?? APP_DEFAULT_PORT;

app.listen(port, () => logger.info(`App listening on port ${port}`));
