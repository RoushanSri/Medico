import dotenv from 'dotenv';
import connectToDB from './db/index.js';
import { app } from './app.js';

dotenv.config(
  { path: './env' }
);

connectToDB().then(()=>{
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((err)=>{
  console.error('Error connecting to MongoDB:', err);
  process.exit(1);
});