// import axios from 'axios';
// import { useState } from 'react';

// export default async function handler (req:any, res:any) {





// console.log("abcd");

//   if (req.method === 'POST') {
// console.log("get block");

//     try {
//       const response = await axios.post(`https://api.mux.com/video/v1/uploads`, {
//         new_asset_settings: 
//         {
//              playback_policy:[
//                 'public'
//             ],
//             "max_resolution_tier": "2160p",
//             "encoding_tier": "smart"
//         },
//         "cors_origin": "*"
//       }, {
//         auth: {
//           username: "3581fa7d-cca0-4889-b86a-cdb8e40bd142",
//           password: "n62VFgIqPhd1tkxtocQ2ny8sb5Ebb4ccEKUkmdI2abaqyNua/ViIvpiUDBPlHUDI84E4+6ZBgmw"
//         },
        
        
//       });

//       const uploadUrl = response.data;
//       res.status(200).json({ uploadUrl });
//       console.log(response.data,"response.data.")
//     } catch (error) {
//       console.error('Error generating upload URL', error);
//       res.status(500).json({ error: 'Error generating upload URL' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method not allowed' });
//   }

// }























import mux from '@mux/mux-node';

const { Video } = new mux(process.env.MUX_TOKEN_ID, process.env.MUX_TOKEN_SECRET);

export default async function handler(req:any, res:any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const upload = await Video.Uploads.create({
      cors_origin: '*',
      new_asset_settings: { playback_policy: 'public' },
    });

    res.status(200).json(upload);
  } catch (error) {
    res.status(500).json({ error});
  }
}