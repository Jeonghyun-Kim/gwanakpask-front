import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, Db } from 'mongodb';
import nextConnect, { NextHandler } from 'next-connect';
import sha256 from 'sha256';

interface RequestWithSession extends NextApiRequest {
  client: MongoClient;
  db: Db;
  session: {
    token: string;
    username: string;
  };
}

// Connecting MongoDb
const verifyToken = async (
  req: RequestWithSession,
  res: NextApiResponse,
  next: NextHandler,
) => {
  if (!req.session.username || !req.session.token)
    return res.status(403).json({ code: 1, message: 'Login First' });
  try {
    const admin = await req.db
      .collection('admin')
      .findOne({ username: req.session.username });
    if (!admin)
      return res.status(400).json({ code: -1, message: 'No Such Admin' });
    if (sha256(admin.password) !== req.session.token) {
      return res
        .status(500)
        .json({ code: -9, message: 'Internal Server Error' });
    }

    return next();
  } catch (err) {
    return res.status(500).json({ code: -10, message: JSON.stringify(err) });
  }
};

// Request handler using next-connect.js
const handler = nextConnect<RequestWithSession, NextApiResponse>();

handler.use(verifyToken);

export default handler;
