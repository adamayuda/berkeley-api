import { Request, Response, NextFunction, RequestHandler } from 'express';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

// Because all type information is erased in the compiled
// JavaScript, we can use this clever structural-typing
// work-around enabled by TypeScript to pass in a class
// to our middleware.
type Constructor<T> = { new (): T };
// This function returns a middleware which validates that the
// request's JSON body conforms to the passed-in type.
export const validateDto = <T>(dto: Constructor<T>): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const output = plainToClass(dto, req.body);

    const errors = await validateSync(output);
    if (errors.length > 0) return res.status(400).json(errors[0].constraints);
    req.body = output;
    next();
  };
};
