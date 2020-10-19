import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, Db } from 'mongodb';
import nextConnect from 'next-connect';
import { session } from 'next-session';

import connectMongoDB from '../../../lib/middlewares/mongodb';
import verifyToken from '../../../lib/middlewares/verifyToken';

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
handler.use(session());
handler.use(verifyToken);

handler.get(async (req, res) => {
  try {
    const data = await new Promise((resolve, reject) => {
      req.db
        .collection('message')
        .find({})
        .toArray((err, result) => {
          if (err) reject(err);
          resolve(result);
        });
    });
    return res.json({ messages: data });
  } catch (err) {
    return res.json({ error: JSON.stringify(err) });
  }
});

export default handler;
