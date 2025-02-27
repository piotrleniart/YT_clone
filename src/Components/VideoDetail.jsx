import { Typography, Box, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";
import { CheckCircle } from "@mui/icons-material";

import { Videos } from './';
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    (async() => {
      const data = await fetchFromAPI(`videos?part=snippet,statistics&id=${id}`);
      setVideoDetail(data.items[0]);

      const videosData = await fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`);
      setVideos(videosData.items);
    })();
  }, [id])

  if (!videoDetail?.snippet) return 'Loading...';

  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Box flex={1}>
          <Box sx={{ width: '100%', position: 'sticky', top: '86px' }}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player" controls />
            <Typography color="#000" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ color: '#fff' }} py={1} px={2}>
              <Link to={`/channel/${channelId}`}>
                <Typography variant={{ sm: 'subtitle1', md: 'h6' }} color="#000">
                  {channelTitle}
                  <CheckCircle sx={{ fontSize: '12px', color: 'grey', ml: '5px' }} />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center" sx={{ color: "black", opacity: 0.7 }}>
                <Typography>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography>
                  {likeCount && parseInt(likeCount).toLocaleString() + " likes"}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center">
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  )
}

export default VideoDetail