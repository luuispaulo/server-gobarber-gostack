import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import './database';

import upload from './config/upload';

const app = express();
app.use(express.json());
app.use('/static', express.static(upload.directory));
app.use(routes);

export default app;
