import app from './src/app';
import logger from './config/logger';
import connectDB from './config/db';

// dotenv.config();
// connectDB();

void connectDB.connect();
const PORT = Number(process.env.PORT) ?? 5000;
app.listen(PORT, () => {
  logger.success(`server started on port ${PORT} `);
});
