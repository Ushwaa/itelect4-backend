import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

declare global {
  var __mongooseConnectionPromise: Promise<typeof mongoose> | undefined;
}

export function isDbConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

export async function connectDB(): Promise<typeof mongoose> {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in the environment variables.');
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  if (!global.__mongooseConnectionPromise) {
    global.__mongooseConnectionPromise = mongoose
      .connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
      .then(() => mongoose)
      .catch((error) => {
        global.__mongooseConnectionPromise = undefined;
        throw error;
      });
  }

  return global.__mongooseConnectionPromise;
}

export async function disconnectDB(): Promise<void> {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  global.__mongooseConnectionPromise = undefined;
}
