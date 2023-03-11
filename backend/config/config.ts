import dotenv from 'dotenv';
import logger from './logger';

let envPath = '';

if (process.env.NODE_ENV === 'production') {
  envPath = '.env';
}
if (process.env.NODE_ENV === 'development') {
  envPath = '.env';
}
if (envPath === '') {
  logger.error('Please use a valid value of NODE_ENV variable.');
  process.exit(1);
}

dotenv.config({ path: envPath });
if (typeof process.env.MONGO_URI === 'undefined') {
  logger.error('Please define MONGO_URI in your .env file.');
  process.exit(1);
}
if (typeof process.env.JWT_SECRET === 'undefined') {
  logger.error('Please define JWT_SECRET in your .env file.');
  process.exit(1);
}
if (typeof process.env.NODE_ENV === 'undefined') {
  logger.error('Please Define Your NODE_ENV in your .env file.');
  process.exit(1);
}

export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const NODE_ENV = process.env.NODE_ENV;
