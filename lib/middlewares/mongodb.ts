import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, Db } from 'mongodb';
import nextConnect, { NextHandler } from 'next-connect';

import { connectMongo } from '../connectMongo';

// Type definition - add client and db to req. (typescript only)
interface RequestWithDbInfo extends NextApiRequest {
  client: MongoClient;
  db: Db;
}

// Connecting MongoDb
const database = async (
  req: RequestWithDbInfo,
  _res: NextApiResponse,
  next: NextHandler,
) => {
  const { client, db } = await connectMongo();
  if (!client.isConnected()) {
    await client.connect();
  }
  req.client = client;
  req.db = db;

  return next();
};

// Request handler using next-connect.js
const handler = nextConnect<RequestWithDbInfo, NextApiResponse>();

handler.use(database);

export default handler;
