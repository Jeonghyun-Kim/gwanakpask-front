import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, Db } from 'mongodb';
import nextConnect from 'next-connect';
import { session } from 'next-session';
import sha256 from 'sha256';

import connectMongoDB from '../../lib/middlewares/mongodb';

interface RequestWithSession extends NextApiRequest {
  client: MongoClient;
  db: Db;
  session: {
    token: string;
    username: string;
  };
}

const collectionName = 'admin';

const handler = nextConnect<RequestWithSession, NextApiResponse>();

handler.use(connectMongoDB);
handler.use(session());

handler.post(async (req, res) => {
  const { username, password } = req.body;
  try {
    const data: Admin | null = await req.db
      .collection(collectionName)
      .findOne({ username });
    if (!data)
      return res.json({ error: { code: 2, message: 'NO SUCH USERNAME' } });
    if (data.password !== password)
      return res.json({ error: { code: 3, message: 'PASSWORD WRONG' } });
    req.session.token = sha256(password);
    req.session.username = username;
    return res.json({ username: data.username });
  } catch (err) {
    return res.json({ error: JSON.stringify(err) });
  }
});

export default handler;
