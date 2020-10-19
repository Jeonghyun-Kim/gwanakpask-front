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

// Handling HTTP Request GET /api/artwork
handler.get(async (req, res) => {
  try {
    // Wait until recieving finish
    const admin: Admin | null = await req.db
      .collection('admin')
      .findOne({ username: req.session.username });
    if (!admin)
      return res
        .status(403)
        .json({ error: { code: -1, message: 'No Such Admin' } });
    return res.json({ username: admin.username });
  } catch (err) {
    return res.json({ error: JSON.stringify(err) });
  }
});

export default handler;
