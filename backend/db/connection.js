import mongoose from 'mongoose';
import 'dotenv/config';

const connectDB = async () => {
  try {
    const dbURI = process.env.MONGO_URI;
    if (!dbURI) {
      throw new Error('MONGO_URI is not defined in the environment variables.');
    }

    await mongoose.connect(dbURI);

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;