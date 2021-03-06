import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, Db } from 'mongodb';
import nextConnect from 'next-connect';

import connectMongoDB from '../../../lib/middlewares/mongodb';
import { timestamp } from '../../../lib/utils';

interface RequestWithSession extends NextApiRequest {
  client: MongoClient;
  db: Db;
  session: {
    token: string;
    username: string;
  };
}

// Request handler using next-connect.js
const handler = nextConnect<RequestWithSession, NextApiResponse>();

// Connect mongodb by using a middleware.
handler.use(connectMongoDB);

handler.post(async (req, res) => {
  const { userId, asPath } = req.body;
  try {
    const user = await req.db
      .collection('pageView')
      .insertOne({ userId, asPath, createdAt: timestamp() });
    return res.json({ user });
  } catch (err) {
    return res.json({ error: JSON.stringify(err) });
  }
});

export default handler;
