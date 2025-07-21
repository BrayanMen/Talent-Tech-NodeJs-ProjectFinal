import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import indexRoutes from './routes/index.route.js';
import { loggerUrl } from './middlewares/logger.middleware.js';
import { handleError } from './middlewares/handleError.middleware.js';
import { notFound } from './middlewares/notFound.middleware.js';

const server = express();
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use('/', indexRoutes);

server.use(notFound)
server.use(handleError);
server.use(loggerUrl);

export default server;