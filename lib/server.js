import dotenv from 'dotenv';
import { APP_DEFAULT_PORT } from './config.js';
import app from './index.js';

dotenv.config();

const port = process.env.APP_PORT ?? APP_DEFAULT_PORT;

app.listen(port, () => console.log(`App listening on port ${port}`));
