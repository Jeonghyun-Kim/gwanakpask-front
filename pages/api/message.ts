import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, Db } from 'mongodb';
import nextConnect from 'next-connect';

import connectMongoDB from '../../lib/middlewares/mongodb';

// import { sendEmail } from '../../lib/sgMailer';

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
  const { templateId = 0, from, content, userId } = req.body;
  if (!from || !content)
    return res
      .status(400)
      .json({ code: 4, message: 'from and content are required' });
  try {
    const message = await req.db
      .collection('message')
      .insertOne({ userId, templateId, from, content });
    // await sendEmail(
    //   `${from}님의 방명록 작성`,
    //   JSON.stringify({ templateId, from, content }),
    //   'ondisplay.art@gmail.com',
    // );
    return res.json({ message });
  } catch (err) {
    return res.json({ error: JSON.stringify(err) });
  }
});

export default handler;
