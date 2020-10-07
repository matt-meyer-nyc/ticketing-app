import { Request, Response, NextFunction } from 'express';
// import { RequestValidationError } from '../errors/request-validation-error';
// import { DatabaseConnectionError } from '../errors/database-connection-error';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // by implemeting CustomError, commented out code below can be reduce to:
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  // if (err instanceof RequestValidationError) {
  //   // const formattedErrors = err.errors.map((error) => {
  //   //   return { message: error.msg, field: error.param };
  //   // });
  //   return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  // }
  // if (err instanceof DatabaseConnectionError) {
  //   return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  // }

  res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  });
};
