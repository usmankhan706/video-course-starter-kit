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
  
  const [isVideoUpload, setUploadVideo]= useState (false);
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
    setUploadVideo(true);
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
  const handleDelete = async () => {
    try {
      console.log("in Delete button ");
      
      
      
      
    } catch (error) {
      console.error('Error fetching video IDs:', error);
    }
  };
// }

useEffect(() => {
    console.log({isVideoUpload});
    fetchVideoIds();
    
  }, [isVideoUpload]);
  


  return (
    <div>
    <div className="bg-white p-4 shadow-md rounded-lg mt-5">
      <input type="file" accept="video/*" onChange={handleFileChange} />
      {/* <p className="text-gray-800">Hello, Tailwind CSS!</p> */}
    </div>
    <button onClick={handleDelete}>
    <div className="max-w-7xl mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {videoIds.map((video, index) => (
            video.playbackId && (
                <div key={index} className="flex justify-center">
                    <div className="max-w-sm rounded overflow-hidden shadow-lg">
                        <MuxPlayer
                            streamType="on-demand"
                            playbackId={video.playbackId}
                            metadataVideoTitle="Video"
                            metadataViewerUserId="Viewer"
                            primaryColor="#FFFFFF"
                            secondaryColor="#000000"
                            
                        />
                    </div>
                </div>
            )
          ))}
    </div>
</div>
          </button>

    </div>
    
  );
};

export default VideoUploader;