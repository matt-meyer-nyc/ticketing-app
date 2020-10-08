import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.use(json());

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

const start = async () => {
  // try to connect to db
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('connected to MongoDB');

    // if connection to db fails, log error
  } catch (err) {
    console.error(err);
  }

  // once connected, listen for oncoming traffic
  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!');
  });
};

// when application loads up, run start function
start();
