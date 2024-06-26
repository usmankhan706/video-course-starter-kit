// pages/api/save-video.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req:any, res:any) {
  if (req.method === 'POST') {
    const { playbackId } = req.body;

    try {
      const video = await prisma.assetid.create({
        data: {
          playbackId,
        },
      });

      res.status(200).json({ data: video });
    } catch (error) {
      console.error('Error saving video:', error);
      res.status(500).json({ error: 'Error saving video' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
