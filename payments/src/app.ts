import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@ehfpinheiro/common';
import { createChargeRouter } from './routes/new';

const app = express();
app.set('trust proxy', true);

if(!process.env.JWT_KEY) {
  process.env.JWT_KEY = 'asdf';
}

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
);
app.use(currentUser);
app.use(createChargeRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };