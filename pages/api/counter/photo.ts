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

const handler = nextConnect<RequestWithSession, NextApiResponse>();

handler.use(connectMongoDB);

handler.post(async (req, res) => {
  const { photoId } = req.body;
  if (!photoId)
    return res.status(400).json({ code: 4, message: 'photoId is required' });
  try {
    const photo = await req.db
      .collection('photo')
      .findOneAndUpdate({ photoId }, { $inc: { hitCount: 1 } });

    if (!photo.value)
      return res.status(400).json({ code: 11, message: 'check photoId' });
    return res.json({ photo });
  } catch (err) {
    return res.json({ error: JSON.stringify(err) });
  }
});

export default handler;
