import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const config = {
  PORT: process.env.PORT || 3000,
  JWT_KEY: process.env.JWT_SECRET,
};

export default config;
