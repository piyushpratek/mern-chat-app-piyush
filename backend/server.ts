import app from './src/app';
import logger from './config/logger';
import connectDB from './config/db';

void connectDB.connect();
const PORT = Number(process.env.PORT) ?? 5000;
app.listen(PORT, () => {
  logger.success(`SERVER STARTED ON PORT ${PORT} `);
});
