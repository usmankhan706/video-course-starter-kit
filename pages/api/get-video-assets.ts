// pages/api/get-video-data.js
import axios from 'axios';
import mux from '@mux/mux-node';

export default async function handler(req:any, res:any) {
  const { id } = req.query; // Get the asset id from the query parameters
  const { Video } = new mux(process.env.MUX_TOKEN_ID, process.env.MUX_TOKEN_SECRET);

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Ensure environment variables are defined
  const MUX_TOKEN_ID = process.env.MUX_TOKEN_ID;
  const MUX_TOKEN_SECRET = process.env.MUX_TOKEN_SECRET;

  if (!MUX_TOKEN_ID || !MUX_TOKEN_SECRET) {
    return res.status(500).json({ message: 'MUX API credentials are not set' });
  }

  try {
    const response = await axios.get(`https://api.mux.com/video/v1/assets/${id}`, {
        auth: {
            username: MUX_TOKEN_ID,
            password: MUX_TOKEN_SECRET
        }
    });
    res.status(200).json(response.data);
    console.log(response.data,"get video assets response");
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving video data' });
  }
}
