// configuration for express app

import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    /*
		secure: true,   --> assure cookie is only set using secure https:// connection, however, will cause Jest tests to fail since uses http://, so needs refactoring
		*/

    // refactored so works with Jest
    // when run in Jest NODE_ENV string variable set to 'test'
    // i.e. if is equal to test 'test' set to false, if not, set to true
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// note: by default using express w/o next call back function instead of 'throw' would cause eroor
// but b/c using npm 'package express-async-errors' can use async in more logical way here with more easy to understand 'throw' syntax
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
