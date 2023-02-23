import app from './src/app';
import logger from './config/logger';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.success(`server started on port ${PORT} `);
});
