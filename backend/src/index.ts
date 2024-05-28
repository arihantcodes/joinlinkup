
import ConnectDB from './config/db';
import dotenv from 'dotenv';
import app from './app';

dotenv.config({
  path: './.env',
});

const PORT = process.env.PORT || 4000;

ConnectDB();

try {
  app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT http://localhost:${PORT}`);
  });
} catch (error) {
  console.log('mongoDB connection Failed', error);
}

app.on('error', (error: any) => {
  console.log('error', error);
  throw error;
});
