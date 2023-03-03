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
  throw new Error();
}

dotenv.config({ path: envPath });
if (typeof process.env.MONGO_URI === 'undefined') {
  throw new Error('Please define MONGO_URI in your .env file.');
}
if (typeof process.env.NODE_ENV === 'undefined') {
  throw new Error('Please Define Your NODE_ENV in your .env file.');
}

export const MONGO_URI = process.env.MONGO_URI;

export const NODE_ENV = process.env.NODE_ENV;
