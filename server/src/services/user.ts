import { User } from "../models/User";
import { AppDataSource } from "../db/data-source";
import logger from "../utils/logger";
import { ValidationException } from "../exceptions/validationException";
import { UserNotFoundException } from "../exceptions/userNotFoundException";
import { comparePassword } from "../utils/helper";

export const registerUser = async (user: User): Promise<User> => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const previousUser = await userRepository.findOne({
        where: { email: user.email },
    });

    if (previousUser) {
        throw new ValidationException('User already exists');
    }

    const savedUser = await userRepository.save(user);
    return savedUser;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

export const loginUser = async (email: string, password: string): Promise<User> => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({
            where: { email: email },
        });
    
        if (!user) {
            throw new UserNotFoundException('User not found');
        }

        const isPasswordCorrect = comparePassword(password, user.password);
        if (!isPasswordCorrect) {
            throw new ValidationException('Invalid credentials');
        }
    
        return user;
    } catch (error) {
        logger.error(error);
        throw error;
    }
}
