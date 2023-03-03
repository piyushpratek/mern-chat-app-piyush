import mongoose from 'mongoose';
import { MONGO_URI } from './config';
import logger from './logger';

export default {
  mongoose,
  connect: async (): Promise<void> => {
    try {
      mongoose.set('strictQuery', true);
      const conn = await mongoose.connect(MONGO_URI);
      if (process.env.NODE_ENV !== 'prod') {
        logger.success(`Mongo Db Connected: ${conn.connection.host}`);
      }
    } catch (error) {
      logger.error(`Error: ${(error as Error).message}`);
      process.exit();
    }
  },
  disconnect: async () => {
    await mongoose.disconnect();
  },
};

// const connectDB = async (): Promise<void> => {
//   try {
//     mongoose.set('strictQuery', true);
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//   logger.success(`MongoDB Connected: ${conn.connection.host}`)

//   }
//    catch (error:any) {
//     logger.error(`Error: ${error.message}`)
//     process.exit()
//    }
// };

// module.exports=connectDB
