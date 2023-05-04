import mongoose from 'mongoose';

import { app } from './app';

const startUp = async () => {
  // if(!process.env.JWT_KEY) {
  //   throw new Error('JWT must be defined');
  // }

  if(!process.env.JWT_KEY) {
    process.env.JWT_KEY = 'asdf';
  }

  if(!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to mongoDB');
  }
  catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
}

startUp();