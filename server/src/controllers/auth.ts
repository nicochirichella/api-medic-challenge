import { Request, Response } from 'express';
import { User } from '../models/User';
import logger from '../utils/logger';
import { ValidationException } from '../exceptions/validationException';
import { UserNotFoundException } from '../exceptions/userNotFoundException';
import { registerUser, loginUser } from '../services/user';
import { encryptPassword } from '../utils/helper';
import jwt from 'jsonwebtoken';
import config from '../config';

const generateAuthResponse = (user: User) => {
  const token = jwt.sign({ id: user.id }, config.JWT_KEY as string, {
    expiresIn: '1h',
  });
  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
    },
  };
};

export const register = async (req: Request, res: Response) => {
  try {
    const newUser = new User({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: encryptPassword(req.body.password),
      gender: req.body.gender,
      birthDate: req.body.birthDate,
    });

    const user = await registerUser(newUser);
    const data = generateAuthResponse(user);
    res.status(201).json({
      msg: 'User created successfully',
      data,
    });
  } catch (error) {
    if (error instanceof ValidationException) {
      return res.status(400).json({
        msg: error.message,
      });
    } else {
      logger.error(error);
      return res.status(500).json({
        msg: 'Something went wrong',
      });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);

    const data = generateAuthResponse(user);
    res.status(200).json({
      msg: 'User logged in successfully',
      data,
    });
  } catch (error) {
    if (error instanceof ValidationException) {
      return res.status(400).json({
        msg: error.message,
      });
    } else if (error instanceof UserNotFoundException) {
      return res.status(404).json({
        msg: error.message,
      });
    } else {
      logger.error(error);
      return res.status(500).json({
        msg: 'Something went wrong',
      });
    }
  }
};
