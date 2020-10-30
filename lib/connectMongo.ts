/* eslint-disable @typescript-eslint/no-explicit-any */
import { MongoClient } from 'mongodb';

const { MONGODB_URI, MONGODB_NAME } = process.env;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local',
  );
}

if (!MONGODB_NAME) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local',
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentiatlly
 * during API Route usage.
 */
let cached = (global as any).mongo;
// eslint-disable-next-line no-multi-assign
if (!cached) cached = (global as any).mongo = {};

export const connectMongo: () => Promise<any> = async () => {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    // eslint-disable-next-line no-console
    console.log('connecting new...');
    const conn: any = {};
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    cached.promise = MongoClient.connect(MONGODB_URI, opts)
      .then((client) => {
        conn.client = client;
        return client.db(MONGODB_NAME);
      })
      .then((db) => {
        conn.db = db;
        cached.conn = conn;
      });
  }
  await cached.promise;
  return cached.conn;
};

export default {
  connectMongo,
};
