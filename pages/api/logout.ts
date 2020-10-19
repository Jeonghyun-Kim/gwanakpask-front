import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { session } from 'next-session';

interface RequestWithSession extends NextApiRequest {
  session: {
    token: string;
    username: string;
    destroy: () => Promise<void>;
  };
}

const handler = nextConnect<RequestWithSession, NextApiResponse>();

handler.use(session());

handler.all(async (req, res) => {
  try {
    await req.session.destroy();
    return res.json({ error: 0 });
  } catch (err) {
    return res.json({ error: JSON.stringify(err) });
  }
});

export default handler;
