import express, { Request, Response } from 'express';
// import { body, validationResult } from 'express-validator';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
// import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';
// import { DatabaseConnectionError } from '../errors/database-connection-error';

const router = express.Router();

router.post(
  '/api/users/signup',
  // validate
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  // handle possible errors
  validateRequest,
  async (req: Request, res: Response) => {
    /*=========ABSTRACTED OUT INTO validateRequest middleware
                          |  take a look at request object
     pull off errors			v
    const errors = validationResult(req);

     see if error exist
    if (!errors.isEmpty()) {
       if there is error return early with throw and send back error response to user
      throw new RequestValidationError(errors.array());
		}
		
		==============================================*/

    // console.log('Creating a user...');
    // throw new DatabaseConnectionError();

    // res.send({});

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // console.log('Email in use');
      // return res.send({});
      throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password });
    await user.save();

    // generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      // check for env. variable done in index.ts file, but TS not aware, '!' at end tells TS we're confident it's ok
      process.env.JWT_KEY!
    );

    // Store JWT on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
