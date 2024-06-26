import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MuxPlayer from '@mux/mux-player-react';

interface Video {
  playbackId: string;
}

const VideoUploader = () => {
  const [uploadUrl, setUploadUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  let upload_url = '';
  var id:any;
  // const [videos, setVideoIds] = useState([]);
  const [videoIds, setVideoIds] = useState<Video[]>([]);
  

  const [videoAssetsId, setVideoAssetsId] = useState('');

  const getUploadUrl = async () => {
    try {
      const response = await axios.post('/api/get-upload-url');
      console.log(response, "response from post");
      id = response.data.id;
      setUploadUrl(response.data.url);
      upload_url = response.data.url;
      console.log(upload_url, "upload_url");

      console.log(response.data.url, "uploadurl getuppload res");
      console.log({ uploadUrl });

    } catch (error) {
      console.error('Error fetching upload URL:', error);
    }
  };

  const handleFileChange = async (event:any) => {
    const file = event.target.files[0];
    console.log({ file });

    console.log(uploadUrl, "uploadUrlinner block");

    if (!upload_url) {
      await getUploadUrl();
    }

    if (upload_url && file) {
      console.log(upload_url, "uploadUrlinner block");

      try {
        const uploadResponse = await axios.put(upload_url, file, {
          headers: {
            'Content-Type': file.type,
          },
        });
        console.log(uploadResponse, "uploadResponse");

        console.log("after put");
        console.log(id, "id play");
        const getVideoData = await axios.get(`/api/get-video-data?id=${id}`);
        console.log(getVideoData, "getVideoData");

        const playbackId = getVideoData.data.data.asset_id;
        console.log(getVideoData.data.data.asset_id,"getting the assets id and set it in the data base");
        
        const getVideoAssets = await axios.get(`/api/get-video-assets?id=${playbackId}`);
        console.log(getVideoAssets, "getVideoAssets");
        const playbackAssetId = getVideoAssets.data.data.playback_ids[0].id
        setVideoAssetsId(getVideoAssets.data.data.playback_ids[0].id);
        console.log(videoAssetsId, "finalvideoAssetsId");

        setVideoUrl(`https://stream.mux.com/${videoAssetsId}.m3u8?default_subtitles_lang=en`);
        // Save video URL and playback ID to database
        console.log({playbackAssetId});
        
        playbackAssetId && await axios.post('/api/save-video', {
          playbackId: playbackAssetId,
        });
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };
  // const handleGetVideos = async (event:any) => {

  const fetchVideoIds = async () => {
    try {
      console.log("in fetch video id try ");
      
      const response = await axios.get('/api/get-all-ids');
      setVideoIds(response.data.data);
      console.log({videoIds});
      console.log(videoIds, "videos array get");
      
      
    } catch (error) {
      console.error('Error fetching video IDs:', error);
    }
  };
// }

  useEffect(() => {
    fetchVideoIds();
  }, []);


  return (
    // <div>
      
    //     <input type="file" accept="video/*" onChange={handleFileChange} />
    //     {/* <button onChange={handleGetVideos}></button> */}
      
    //   <div style={{ "zIndex": "1000" }}>
    //     {videoUrl && (
    //       <MuxPlayer
    //         streamType="on-demand"
    //         playbackId={videoAssetsId}
    //         metadataVideoTitle="Placeholder (optional)"
    //         metadataViewerUserId="Placeholder (optional)"
    //         primaryColor="#FFFFFF"
    //         secondaryColor="#000000"
    //       />
    //     )}
    //   </div>
    // </div>
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <div className="row text-center mb-5 mt-4" style={{margin:"auto 400px"}}>
      <div className="col-sm-3 col-md-12 text-center">
        {videoIds.map((video, index) => (
          video.playbackId && (
            <div key={index}>
              <MuxPlayer
                streamType="on-demand"
                playbackId={video.playbackId}
                metadataVideoTitle="Video"
                metadataViewerUserId="Viewer"
                primaryColor="#FFFFFF"
                secondaryColor="#000000"
              />
            </div>
          )
        ))}
      </div>
      </div>
    </div>
    
  );
};

export default VideoUploader;