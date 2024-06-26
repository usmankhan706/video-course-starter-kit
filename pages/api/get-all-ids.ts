// pages/api/get-all-ids.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req:any, res:any) {
  if (req.method === 'GET') {
    try {
      const videoIds = await prisma.assetid.findMany({
        select: {
          playbackId: true,
        },
      });

      res.status(200).json({ data: videoIds });
    } catch (error) {
      console.error('Error fetching video IDs:', error);
      res.status(500).json({ error: 'Error fetching video IDs' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
