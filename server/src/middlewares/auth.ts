// export validateFields method for authentication
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { RegisterRequest } from '../routes/requestTypes/auth';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import config from '../config';

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
  gender: Joi.string().required(),
});

export const validateRegisterFields = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  const body: RegisterRequest = req.body;

  try {
    const value = schema.validate(body);
    if (value.error) {
      return res.status(400).json(value.error);
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Something went wrong',
    });
  }
};

export const validateAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({
      msg: 'No token, authorization denied',
    });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_KEY as string);
    req.body.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      msg: 'Token is not valid',
    });
  }
};
