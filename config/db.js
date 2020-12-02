import config from 'config';
import mongoose from 'mongoose';

const db = config.get('mongoURI');

export const connectDb = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    proccess.exit(1);
  }
};
