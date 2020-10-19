import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, Db } from 'mongodb';
import nextConnect from 'next-connect';

import connectMongoDB from '../../../lib/middlewares/mongodb';

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

handler.get(async (req, res) => {
  try {
    const visitorCount = await req.db.collection('visitor').find({}).count();
    const messageCount = await req.db.collection('message').find({}).count();
    return res.json({
      counts: { visitor: visitorCount, message: messageCount },
    });
  } catch (err) {
    return res.json({ error: JSON.stringify(err) });
  }
});

export default handler;
