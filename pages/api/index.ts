import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get((_req, res) => {
  res.json({ version: '1.0.0' });
});

export default handler;
