import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

// reach into existing TS definition and make modification; needed to be able to let TS know details about currentUser
declare global {
  namespace Express {
    // augment defined TS definition for Request
    interface Request {
      // add additional property to it
      // currentUser? ... b/c may or may not be defined depending on if user is logged in
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // if user not logged in, continue (i.e. next() )
  if (!req.session?.jwt) {
    return next();
  }

  try {
    // if logged in extract payload
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    // set payload on current user
    req.currentUser = payload;
  } catch (err) {
    // whether or not decode token successfully, want to move on to next middleware, so don't need to include next here
  }

  next();
};
