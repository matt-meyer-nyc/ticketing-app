import express from 'express';
// import jwt from 'jsonwebtoken';
//import { errorHandler } from '../middlewares/error-handler';

import { currentUser } from '../middlewares/current-user';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
  /* ================ABSTRACTD OUT INTO CURRENTUSER middleware

	// if JWT not set or invalid ... return early

  // if (!req.session || !req.session.jwt) { } --- this is if check is equivalent to !req.session?.jwt
  if (!req.session?.jwt) {
    return res.send({ currentUser: null });
  }
  try {
    // how to decode or extract info out of JWT token
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    res.send({ currentUser: payload });
  } catch (err) {
    res.send({ currentUser: null });
	}
	==================================================  */

  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
